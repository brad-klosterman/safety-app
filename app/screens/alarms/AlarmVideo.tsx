import React from 'react';
import { WebView } from 'react-native-webview';

import { Alarms } from '@state';
import { ScreenView } from '@components/elements';

/**
 *  Alarm Video Screen
 *   -----
 *
 **/

function AlarmVideo() {
    const {
        state: { subscribed_alarm },
    } = Alarms.useContext();

    const video_url = subscribed_alarm?.video_url;

    if (!video_url) return null;

    return (
        <ScreenView>
            <WebView
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={false}
                source={{ uri: video_url }}
            />
        </ScreenView>
    );
}

export { AlarmVideo };
