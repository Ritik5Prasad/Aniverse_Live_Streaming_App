import { Colors } from '@/utils/Constants';
import Video from 'react-native-video'
import { FC, useRef, useState } from 'react';
import { View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import ScalePress from '../ui/ScalePress';
import { interactionStyles } from '@/styles/interactionStyles';
import { Anime } from '@/service/animeStore';

const VideoPlayer: FC<{ item: Anime }> = ({ item }) => {
    const ref = useRef(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleReadyForPlay = async () => {
        setTimeout(() => {
            setIsLoaded(true)
            setIsPaused(false)
        }, 3000)
    }
    return (
        <View style={interactionStyles.videoContainer}>

            <Video
                ref={ref}
                style={interactionStyles.video}
                allowsExternalPlayback
                pictureInPicture
                playWhenInactive={false}
                playInBackground={false}
                paused={isPaused}
                shutterColor='transparent'
                hideShutterView
                controls={true}
                onReadyForDisplay={
                    handleReadyForPlay
                }
                //ios
                source={{ uri: item?.stream_url }}
            // ANdroid  source={{ uri: 'http://192.168.29.69:8080/output.m3u8' }}
            />
            {!isLoaded &&
                <Image source={{ uri: item?.thumbnail_url }} style={interactionStyles.imageOverlay} />
            }
            {!isLoaded &&
                <ScalePress style={interactionStyles.playIcon} >
                    <Ionicons name="play-circle" size={RFValue(60)} color={Colors.theme} />
                </ScalePress>
            }
        </View>
    );
}



export default VideoPlayer;
