import { View, FlatList, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import CustomText from '../ui/CustomText';
import { commonStyles } from '@/styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { interactionStyles } from '@/styles/interactionStyles';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SocketProps } from './LikeCount';
import { useWS } from '@/service/sockets/WSProvider';
import { timeAgo } from '@/utils/Helpers';

const CommentList: FC<SocketProps> = ({ initialValue, setInitialValue }) => {
    const socketService = useWS();

    useEffect(() => {
        const handleNewComment = (comments: any) => {
            const updatedData = {
                ...initialValue,
                comments: comments,
            }
            if (setInitialValue)
                setInitialValue(updatedData);
        };

        socketService.on('STREAM_COMMENTS', handleNewComment);

        return () => {
            socketService.off('STREAM_COMMENTS');
        };
    }, [socketService, setInitialValue]);

    const renderComments = ({ item }: any) => {
        return (
            <Animated.View entering={FadeInLeft.duration(1000)} style={[commonStyles.flexRowBetween, interactionStyles.item]}>
                <View style={commonStyles.flexRowGap}>
                    <Image source={{ uri: item?.user?.picture }} style={interactionStyles.avatar} />
                    <View>
                        <CustomText variant='h8' fontFamily='SemiBold' style={interactionStyles.username}>
                            @{item.user?.username} • {timeAgo(item.timestamp)}
                        </CustomText>
                        <CustomText variant='h7' fontFamily='SemiBold'>{item.comment}</CustomText>
                    </View>
                </View>
                <Ionicons name="ellipsis-vertical" size={RFValue(12)} color={Colors.text} />
            </Animated.View>
        );
    };

    return (
        <View style={interactionStyles.commentContainer}>
            <FlatList
                data={initialValue?.comments || []}
                renderItem={renderComments}
                inverted
                ListEmptyComponent={
                    <View style={interactionStyles.emptyContainer}>
                        <CustomText style={interactionStyles.center}>There are no comments yet! Be fearless and comment</CustomText>
                    </View>
                }
                windowSize={4}
                initialNumToRender={4}
                keyExtractor={(item: any) => item?._id?.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={interactionStyles.bottomPadding}
            />
        </View>
    );
};

export default CommentList;
