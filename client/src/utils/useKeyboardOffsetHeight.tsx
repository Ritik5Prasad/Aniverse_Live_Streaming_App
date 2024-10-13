import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboardOffsetHeight() {
    const [keyBoardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

    useEffect(() => {
        const keyboardWillAndroidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            e => {
                setKeyboardOffsetHeight(e.endCoordinates.height);
            },
        );
        const keyboardWillAndroidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOffsetHeight(0);
            },
        );
        const keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            e => {
                setKeyboardOffsetHeight(e.endCoordinates.height);
            },
        );
        const keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => {
                setKeyboardOffsetHeight(0);
            },
        );

        return () => {
            keyboardWillHideListener.remove();
            keyboardWillAndroidShowListener.remove();
            keyboardWillAndroidHideListener.remove();
            keyboardWillShowListener.remove();
        };
    }, []);

    return keyBoardOffsetHeight;
}
