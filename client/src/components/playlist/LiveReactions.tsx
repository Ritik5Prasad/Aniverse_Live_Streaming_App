import React, { FC, useEffect, useState } from 'react';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Easing,
    Text
} from 'react-native';
import { Colors } from '@/utils/Constants';
import CustomText from '../ui/CustomText';
import { SocketProps } from './LikeCount';
import { useWS } from '@/service/sockets/WSProvider';

const LiveReactions: FC<SocketProps> = ({ initialValue }) => {
    const [hearts, setHearts] = useState<any>([]);
    const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false);
    const [emojiSelectorHeight] = useState(new Animated.Value(0));
    const [selectedEmoji, setSelectedEmoji] = useState('❤️');

    const socketService = useWS()



    const addEmoji = (emoji: string) => {
        const randomX = Math.random() * 80 - 40;
        const randomRotation = Math.random() * 60 - 20;
        const newHeart = {
            id: Date.now(),
            text: emoji,
            position: new Animated.Value(0),
            opacity: new Animated.Value(1),
            translateX: new Animated.Value(randomX),
            rotate: new Animated.Value(randomRotation),
        };

        setHearts((prevHearts: any) => [...prevHearts, newHeart]);

        Animated.parallel([
            Animated.timing(newHeart.position, {
                toValue: -200,
                duration: 2000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(newHeart.opacity, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setHearts((hearts: any) => hearts.filter((heart: any) => heart.id !== newHeart.id));
        });
    };

    const openEmojiSelector = () => {
        setEmojiSelectorVisible(true);
        Animated.timing(emojiSelectorHeight, {
            toValue: 250,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const closeEmojiSelector = () => {
        Animated.timing(emojiSelectorHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setEmojiSelectorVisible(false));
    };

    const emojiData = ["😇", "🗿", "🥰", '💦', '🔥', "❤️", "😜", "😭", "😴"];


    useEffect(() => {
        socketService.on("STREAM_REACTIONS", (reactionData) => {
            addEmoji(reactionData.emoji);
        });
        return () => {
            socketService.off("STREAM_REACTIONS");
        };
    }, [socketService]);

    // Simulate Emojis

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const randomEmoji = emojiData[Math.floor(Math.random() * emojiData.length)];
    //         addEmoji(randomEmoji);
    //     }, 100);

    //     // Clean up interval on component unmount
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <TouchableWithoutFeedback onPress={closeEmojiSelector}>
            <View style={styles.container}>
                {hearts.map((heart: any) => (
                    <Animated.View
                        key={heart.id}
                        style={[
                            styles.heart,
                            {
                                transform: [
                                    { translateY: heart.position },
                                    { translateX: heart.translateX },
                                    {
                                        rotate: heart.rotate.interpolate({
                                            inputRange: [-30, 30],
                                            outputRange: ['-30deg', '30deg'],
                                        })
                                    },
                                ],
                                opacity: heart.opacity,
                            },
                        ]}
                    >
                        <Text style={styles.emoji}>{heart.text}</Text>
                    </Animated.View>
                ))}

                {emojiSelectorVisible && (
                    <Animated.ScrollView showsVerticalScrollIndicator={false} style={[styles.emojiSelector, { maxHeight: emojiSelectorHeight }]}>
                        {emojiData.map((emoji, index) => (
                            <TouchableOpacity key={index} onPress={() => {
                                setSelectedEmoji(emoji);
                                socketService.emit("SEND_REACTION", { animeId: initialValue?._id, reaction: emoji });
                                closeEmojiSelector();
                            }}>
                                <CustomText variant='h6' style={styles.emojiItem}>{emoji}</CustomText>
                            </TouchableOpacity>
                        ))}
                    </Animated.ScrollView>
                )}

                <TouchableOpacity
                    onLongPress={openEmojiSelector}
                    onPress={() => {
                        socketService.emit("SEND_REACTION", { animeId: initialValue?._id, reaction: selectedEmoji });
                    }}
                    style={styles.heartIconContainer}
                >
                    <CustomText variant='h3' style={styles.emojiItem}>{selectedEmoji}</CustomText>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        right: 10,
        alignItems: 'center',
    },
    heartIconContainer: {
        borderRadius: 100,
        borderWidth: 1,
        width: 50,
        height: 50,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heart: {
        position: 'absolute',
        bottom: 50,
        right: 20,
    },
    emoji: {
        fontSize: 24,
    },
    emojiSelector: {
        position: 'absolute',
        bottom: 60,
        right: 6,
        width: 40,
        backgroundColor: Colors.secondary,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.secondary,
        overflow: 'hidden',
    },
    emojiItem: {
        paddingVertical: 5,
        textAlign: 'center',
    },
});

export default LiveReactions;
