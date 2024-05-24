import React from 'react';

import { Profile } from '@state';
import { Flex, Text, ProgressIndicator } from '@components/ui';
import { ScreenView } from '@components/elements';

function InitializingScreen() {
    const ProfileContext = Profile.useContext();
    const ssp = ProfileContext?.profile?.ssp;

    return (
        <ScreenView>
            <Flex
                flex={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap="s"
            >
                <Text
                    color="text_secondary"
                    variant="subheadline"
                    style={{ letterSpacing: 3 }}
                >
                    LOADING
                </Text>

                <ProgressIndicator
                    duration={1000}
                    itemWidth={16}
                    itemHeight={8}
                    itemsOffset={4}
                    topScale={4}
                />
                <Flex
                    marginTop="s"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    {ssp && (
                        <Text
                            variant="large_title_bold"
                            textAlign="center"
                            color="text_primary"
                        >
                            {ssp.name.toUpperCase()}
                        </Text>
                    )}
                    <Text
                        variant="headline_bold"
                        color="text_tertiary"
                        textAlign="center"
                        style={{ letterSpacing: 4 }}
                    >
                        SAFETY APP
                    </Text>
                </Flex>
            </Flex>
        </ScreenView>
    );
}

InitializingScreen.Options = {
    headerShown: false,
};

export { InitializingScreen };
