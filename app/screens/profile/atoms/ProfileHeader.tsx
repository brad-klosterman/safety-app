import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { type ProfileType } from '@state';
import { Box, Row, Stack, Text, Icon } from '@components/ui';

const ProfileHeader = (props: {
    profile: Pick<
        ProfileType.UserProfileModel,
        'profile_picture_url' | 'firstname' | 'lastname' | 'ssp'
    >;
    openCamera(): void;
}) => {
    const { firstname, lastname, profile_picture_url, ssp } = props.profile;

    return (
        <Row
            gap="m"
            padding="m"
            paddingTop="m"
            borderRadius="l"
            borderColor="background_elevated_primary"
            backgroundColor="background_elevated_primary"
        >
            <Box flex={2}>
                <Pressable
                    accessibilityRole="button"
                    onPress={props.openCamera}
                >
                    {profile_picture_url ? (
                        <Image
                            source={{ uri: profile_picture_url || '' }}
                            resizeMode="contain"
                            style={styles.profile_pic}
                        />
                    ) : (
                        <Icon.MenuPerson
                            size={40}
                            color="text_tertiary"
                        />
                    )}
                </Pressable>
            </Box>

            <Stack flex={10}>
                <Text variant="title_2">
                    {firstname} {lastname}
                </Text>
                <Text variant="subheadline">{ssp.name}</Text>
            </Stack>
        </Row>
    );
};

const styles = StyleSheet.create({
    profile_pic: {
        borderRadius: 100,
        height: undefined,
        aspectRatio: 1,
    },
});

export { ProfileHeader };
