import { View } from 'react-native';
import React, { FC, memo, useEffect, useState } from 'react';
import { interactionStyles } from '@/styles/interactionStyles';
import { commonStyles } from '@/styles/commonStyles';
import LikeCount from './LikeCount';
import CommentCount from './CommentCount';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import LiveReactions from './LiveReactions';
import { Anime } from '@/service/animeStore';
import { useWS } from '@/service/sockets/WSProvider';

const Interactions: FC<{ item: Anime }> = ({ item }) => {
    const { _id } = item;

    const [initialValue, setInitialValue] = useState<any>();
    const socketService = useWS();

    useEffect(() => {
        if (socketService && _id) {
            socketService.emit('JOIN_STREAM', { animeId: _id });
            socketService.emit('GET_ANIME_INFO', { animeId: _id });
            const handleStatusUpdate = (item: {
                likes: number;
                is_liked: boolean;
                is_starred: boolean;
                rating: number;
                starred: number;
                comments: any;
                _id: string;
            }) => {
                setInitialValue(item);
            };

            socketService.on('STREAM_ANIME_INFO', handleStatusUpdate);

            return () => {
                socketService.off('STREAM_ANIME_INFO');
                socketService.off('JOIN_STREAM');
            };
        }
    }, [_id, socketService]);


    return (
        <>
            <View style={interactionStyles.container}>
                <View style={commonStyles.flexRowGap}>
                    <LikeCount initialValue={initialValue} setInitialValue={(data: any) => setInitialValue(data)} />
                    <CommentCount initialValue={initialValue} />
                </View>

                <CommentList initialValue={initialValue} setInitialValue={(data: any) => setInitialValue(data)} />
                <LiveReactions initialValue={initialValue} />
            </View>
            <CommentInput initialValue={initialValue} />
        </>
    );
};

export default memo(Interactions);
