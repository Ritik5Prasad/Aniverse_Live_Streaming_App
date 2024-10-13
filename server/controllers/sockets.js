const Anime = require("../models/Anime");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleSocketConnection = (io) => {
  io.use(async (socket, next) => {
    const token = socket.handshake.headers.access_token;
    if (!token) {
      return next(new Error("Authentication invalid: No token provided"));
    }
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(payload.id);
      if (!user) {
        return next(new Error("Authentication invalid: User not found"));
      }
      socket.user = { id: payload.id, full_name: payload.full_name };
      next();
    } catch (error) {
      console.log("Socket Error", error);
      return next(
        new Error("Authentication invalid: Token verification failed")
      );
    }
  });

  io.on("connection", (socket) => {
    socket.on("JOIN_STREAM", async ({ animeId }) => {
      console.log(animeId, "user Joined");
      socket.join(animeId);
    });

    // New event for fetching anime details
    socket.on("GET_ANIME_INFO", async ({ animeId }) => {
      const anime = await Anime.findById(animeId).populate("comments.user");
      if (!anime) {
        socket.emit("ERROR", { message: "Anime not found" });
        return;
      }

      const isLiked = anime.liked_by.includes(socket.user.id);
      const isStarred = anime.starred_by.includes(socket.user.id);

      socket.emit("STREAM_ANIME_INFO", {
        _id: anime.id,
        is_liked: isLiked,
        is_starred: isStarred,
        likes: anime.likes,
        rating: anime.rating,
        starred: anime.starred,
        comments: anime.comments,
      });
    });

    socket.on("LIKE_ANIME", async ({ animeId }) => {
      const anime = await Anime.findById(animeId);

      if (!anime) {
        socket.emit("ERROR", { message: "Anime not found" });
        return;
      }

      const alreadyLiked = anime.liked_by.includes(socket.user.id);
      if (!alreadyLiked) {
        anime.likes += 1;
        anime.liked_by.push(socket.user.id);
        await anime.save();

        io.to(animeId).emit("STREAM_LIKES", { likes: anime.likes });
      }
    });

    socket.on("RATE_ANIME", async ({ animeId, rating }) => {
      const anime = await Anime.findById(animeId);

      if (!anime) {
        socket.emit("ERROR", { message: "Anime not found" });
        return;
      }

      if (rating >= 0 && rating <= 10) {
        anime.rating = rating;
        await anime.save();

        io.to(animeId).emit("STREAM_RATING", { rating: anime.rating });
      }
    });

    socket.on("STAR_ANIME", async ({ animeId }) => {
      const anime = await Anime.findById(animeId);

      if (!anime) {
        socket.emit("ERROR", { message: "Anime not found" });
        return;
      }

      const alreadyStarred = anime.starred_by.includes(socket.user.id);
      if (!alreadyStarred) {
        anime.starred += 1;
        anime.starred_by.push(socket.user.id);
        await anime.save();

        io.to(animeId).emit("STREAM_STARRED", { starred: anime.starred });
      }
    });

    socket.on("NEW_COMMENT", async ({ animeId, comment }) => {
      const anime = await Anime.findById(animeId);
      if (!anime) {
        socket.emit("ERROR", { message: "Anime not found" });
        return;
      }

      anime.comments.push({ user: socket.user.id, comment });
      await anime.save();

      const updatedAnime = await Anime.findById(animeId).populate(
        "comments.user"
      );

      io.to(animeId).emit("STREAM_COMMENTS", updatedAnime.comments);
    });

    socket.on("SEND_REACTION", async ({ animeId, reaction }) => {
      const anime = await Anime.findById(animeId);
      if (!anime) {
        socket.emit("ERROR", { message: "Anime not found" });
        return;
      }

      const reactionData = {
        emoji: reaction,
        timestamp: Date.now(),
      };

      io.to(animeId).emit("STREAM_REACTIONS", reactionData);
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = handleSocketConnection;
