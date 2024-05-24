import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { styled } from '@theme';
import { PressableOpacity, Box } from '@components/ui';

const TakePhotoButton = ({ onPress, size = 80 }: { onPress(): void; size?: number }) => {
    const styles = useStyles();
    return (
        <PressableOpacity
            onPress={onPress}
            hitSlop={50}
        >
            <Box
                width={size}
                height={size}
                borderRadius="full"
                borderWidth={1}
                borderColor="text_primary"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    width={size - 12}
                    height={size - 12}
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Ionicons
                        name="camera"
                        size={(size - 12) / 2}
                        style={styles.icon_color}
                    />
                </Box>
            </Box>
        </PressableOpacity>
    );
};

const SwitchCameraButton = ({ onPress, size = 60 }: { onPress(): void; size?: number }) => {
    const styles = useStyles();
    return (
        <PressableOpacity
            onPress={onPress}
            hitSlop={50}
        >
            <Box
                width={size}
                height={size}
                borderRadius="full"
                borderWidth={1}
                borderColor="text_primary"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    width={size - 12}
                    height={size - 12}
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Ionicons
                        name="camera-reverse-sharp"
                        size={(size - 12) / 2}
                        style={styles.icon_color}
                    />
                </Box>
            </Box>
        </PressableOpacity>
    );
};

const MediaImage = ({ onPress, size = 60 }: { onPress(): void; size?: number }) => {
    const styles = useStyles();
    return (
        <PressableOpacity
            onPress={onPress}
            hitSlop={50}
        >
            <Box
                width={size}
                height={size}
                borderRadius="full"
                borderWidth={1}
                borderColor="text_primary"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    width={size - 12}
                    height={size - 12}
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Ionicons
                        name="images"
                        size={(size - 12) / 2}
                        style={styles.icon_color}
                    />
                </Box>
            </Box>
        </PressableOpacity>
    );
};

const useStyles = styled((theme) => ({
    icon_color: {
        color: theme.colors.text_primary,
    },
}));

/** Exports*/
export const Camera = {
    TakePhotoButton,
    SwitchCameraButton,
    MediaImage,
};
