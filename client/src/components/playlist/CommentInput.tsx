import { View, TextInput, TouchableOpacity, Image, Animated, Platform } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import useKeyboardOffsetHeight from '@/utils/useKeyboardOffsetHeight';
import { Colors } from '@/utils/Constants';
import { interactionStyles } from '@/styles/interactionStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { SocketProps } from './LikeCount';
import { useWS } from '@/service/sockets/WSProvider';
import { useAuthStore } from '@/service/authStore';

const CommentInput: FC<SocketProps> = ({ initialValue, setInitialValue }) => {
  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState('');
  const socketService = useWS();
  const { user } = useAuthStore()
  const keyboardLift = Platform.OS === 'ios' ? -keyBoardOffsetHeight : -keyBoardOffsetHeight * 0.02
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: keyBoardOffsetHeight === 0 ? 0 : keyboardLift,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [keyBoardOffsetHeight]);

  const handleSendComment = () => {
    if (value.trim()) {
      socketService.emit('NEW_COMMENT', { animeId: initialValue._id, comment: value });
      setValue('');
    }
  };

  return (
    <Animated.View style={[interactionStyles.inputContainer, { transform: [{ translateY: animatedValue }] }]}>
      <Image source={{ uri: user?.picture }} style={interactionStyles.avatar} />
      <TextInput
        placeholder='Write here....'
        textAlignVertical='top'
        placeholderTextColor={'#666'}
        style={interactionStyles.input}
        multiline
        maxLength={120}
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity onPress={handleSendComment}>
        <MaterialIcons name="send" size={RFValue(20)} color={Colors.theme} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CommentInput;
