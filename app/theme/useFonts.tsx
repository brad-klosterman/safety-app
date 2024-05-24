import React from 'react';
import {
    useFonts as useInterFonts,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
} from '@expo-google-fonts/inter';

const useFonts = (props: { onLoadComplete(): void }) => {
    const [loaded, error] = useInterFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    React.useEffect(() => {
        if (loaded) props.onLoadComplete();
    }, [loaded, props]);

    return {
        loaded: loaded && !error,
    };
};

export { useFonts };
