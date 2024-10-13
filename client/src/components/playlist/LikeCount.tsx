import React, { FC, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { interactionStyles } from '@/styles/interactionStyles';
import CustomText from '../ui/CustomText';
import { formatCount } from '@/utils/Helpers';
import { Colors } from '@/utils/Constants';
import { useWS } from '@/service/sockets/WSProvider';

export interface SocketProps {
    initialValue: any;
    setInitialValue?: (data: any) => void;
}

const LikeCount: FC<SocketProps> = ({ initialValue, setInitialValue }) => {
    const socketService = useWS();

    useEffect(() => {
        socketService.on('STREAM_LIKES', (data: { likes: number }) => {
            if (setInitialValue) {
                const updatedValue = {
                    ...initialValue,
                    likes: data.likes,
                }
                setInitialValue(updatedValue);
            }
        });

        return () => {
            socketService.off('STREAM_LIKES');
        };
    }, [socketService, initialValue?._id, setInitialValue]);

    const handleLikePress = () => {
        if (!initialValue?.is_liked) {
            socketService.emit('LIKE_ANIME', { animeId: initialValue?._id });
            if (setInitialValue) {
                const updatedValue = {
                    ...initialValue,
                    likes: initialValue?.likes + 1,
                    is_liked: true,
                }
                setInitialValue(updatedValue);
            }
        }
    };

    return (
        <TouchableOpacity style={interactionStyles.buttonContainer} onPress={handleLikePress}>
            <MaterialCommunityIcons
                name={initialValue?.is_liked ? "thumb-up" : "thumb-up-outline"}
                size={RFValue(14)}
                color={Colors.text}
            />
            <CustomText variant='h8' fontFamily='SemiBold'>{formatCount(initialValue?.likes)} Likes</CustomText>
        </TouchableOpacity>
    );
};

export default LikeCount;
