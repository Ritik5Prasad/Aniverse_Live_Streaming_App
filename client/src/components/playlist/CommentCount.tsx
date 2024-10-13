import { TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@/utils/Constants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomText from '../ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { interactionStyles } from '@/styles/interactionStyles';
import { SocketProps } from './LikeCount';
import { formatCount } from '@/utils/Helpers';

const CommentCount: FC<SocketProps> = ({ initialValue }) => {
    return (
        <TouchableOpacity style={interactionStyles.buttonContainer}>
            <MaterialCommunityIcons name='comment-text' size={RFValue(14)} color={Colors.text} />
            <CustomText variant='h8' fontFamily='SemiBold'>{formatCount(initialValue?.comments?.length)} Comments</CustomText>
        </TouchableOpacity>
    )
}

export default CommentCount