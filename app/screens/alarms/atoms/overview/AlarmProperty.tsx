import React from 'react';

import { AlarmsType } from '@state';
import { Section } from './Section';

const AlarmProperty = (props: {
    video_url: string | null;
    address: string | null;
    transmitter: AlarmsType.AlarmTransmitterModel | null;
    pressViewVideo(url: string): void;
}) => {
    const { video_url, address, transmitter, pressViewVideo } = props;

    if (!address) return null;

    return (
        <Section>
            <Section.Title
                title="PROPERTY"
                expander={
                    video_url
                        ? { title: 'VIEW VIDEO', onPress: () => pressViewVideo(video_url) }
                        : null
                }
            />
            <Section.Content>
                <Section.Row title={address} />
                <Section.Row
                    title="TRANSMITTER:"
                    value={transmitter?.name}
                />
            </Section.Content>
        </Section>
    );
};

export { AlarmProperty };
