require("dotenv").config();

// const gogoanime = new ANIME.Gogoanime();
// const results = gogoanime.fetchEpisodeServers('one-piece-film-z-episode-1').then((data) => {
//   console.log(data);
// });

const mongoose = require("mongoose");
const connectDB = require("./config/connect");
const Anime = require("./models/Anime");
const { animeData } = require("./seedData");

async function seedDB() {
  try {
    await connectDB(process.env.MONGO_URI);

    await Anime.deleteMany({});
    console.log("Cleared Anime collection 🗑️");

    await Anime.insertMany(animeData);
    console.log("Anime data seeded successfully! ✅");

    mongoose.connection.close();
    console.log("Database connection closed. 🚀");
  } catch (error) {
    console.error("Error seeding database:❌", error);
  }
}

seedDB();
