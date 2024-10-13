import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/utils/Constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { playlistStyles } from '@/styles/playlistStyles';
import CustomText from '../ui/CustomText';
import { router } from 'expo-router';

const PlaylistHeader: FC<{ title: string, genre: string }> = ({ title, genre }) => {
  return (
    <View>
      <SafeAreaView />
      <View style={playlistStyles.container}>
        <View style={playlistStyles.flexRowGap}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View>
            <CustomText fontFamily='Medium' numberOfLines={1}>{title}</CustomText>
            <CustomText fontFamily='Regular' variant='h8' numberOfLines={1}>{genre}</CustomText>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="star-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  )
}



export default PlaylistHeader