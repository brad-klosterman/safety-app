import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking } from 'react-native';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { FlipType, SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import { Box, Row, Stack, Button } from '@components/ui';
import { Camera } from '@components/camera/Camera';
import { type CameraPhoto } from '@components/camera/types';

const ProfileCamera = (props: {
    profile_picture_url: string | null | undefined;
    captured_image: string | null;
    setCapturedImage(image_url: string | null): void;
}) => {
    let camera: ExpoCamera;

    const [loading, setLoading] = useState(false);
    const [camera_ready, setCameraReady] = useState(false);
    const [camera_front, setCameraFront] = useState(false);
    const [preview_visible, setPreviewVisible] = useState(false);
    const [using_initial_image, setUsingInitialImage] = useState(
        Boolean(props.profile_picture_url)
    );

    const [media_permission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();

    useEffect(() => {
        if (props.profile_picture_url) {
            props.setCapturedImage(props.profile_picture_url);
            setUsingInitialImage(true);
            setPreviewVisible(true);
        }
    }, [props.profile_picture_url]);

    useEffect(() => {
        if (camera_ready) setCameraFront(true);
    }, [camera_ready]);

    const onCameraReady = () => {
        setLoading(false);
        setCameraReady(true);
    };

    const takePicture = async () => {
        if (!camera) return;

        const photo: CameraPhoto = await camera.takePictureAsync({
            scale: 1,
            quality: 0.5,
        });

        const formatted_photo = await manipulateAsync(
            photo.uri,
            [
                { rotate: 180 },
                { flip: FlipType.Vertical },
                {
                    resize: {
                        width: photo.width,
                        height: photo.height,
                    },
                },
            ],
            {
                format: 'jpeg' as SaveFormat,
                compress: 0.5,
                base64: true,
            }
        );
        props.setCapturedImage(formatted_photo.uri);
        setUsingInitialImage(false);
        setPreviewVisible(true);
    };

    const onPressReset = async () => {
        //setCapturedImage(profile.profile_picture_url);
        setUsingInitialImage(true);
        setPreviewVisible(true);
    };

    const onPressRetake = async () => {
        if (!camera_ready) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 15000);
        }
        props.setCapturedImage(null);
        setUsingInitialImage(false);
        setPreviewVisible(false);
    };

    const requestMediaPhoto = async () => {
        const openMediaLibrary = async () => {
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            }).then((result) => {
                if (!result.canceled) {
                    props.setCapturedImage(result.assets[0].uri);
                    setUsingInitialImage(false);
                    setPreviewVisible(true);
                }
            });
        };

        if (!media_permission?.granted) {
            await requestMediaPermission().then((request_response) => {
                if (request_response.granted) {
                    openMediaLibrary();
                } else {
                    Alert.alert(
                        'Could Not Access Permission SettingsNavigation.',
                        'Please update the devices camera settings to allow access to your camera',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Ok',
                                style: 'default',
                                onPress: () => Linking.openSettings(),
                            },
                        ]
                    );
                }
            });
        } else {
            openMediaLibrary();
        }
    };

    return (
        <>
            <Spinner
                visible={loading}
                textContent={'Loading Camera...'}
                animation={'fade'}
                textStyle={{ color: '#fff' }}
                overlayColor="rgba(0, 0, 0, 0.65)"
            />
            <Stack gap="l">
                {preview_visible && props.captured_image ? (
                    <Stack gap="m">
                        <Box>
                            <Image
                                source={{ uri: props.captured_image }}
                                resizeMode="contain"
                                style={{
                                    flex: 1,
                                    aspectRatio: 1,
                                }}
                            />
                        </Box>
                        <Row justifyContent="center">
                            <Row gap="s">
                                {props.profile_picture_url && !using_initial_image && (
                                    <Button
                                        variant="secondary"
                                        fit_width
                                        onPress={() => onPressReset()}
                                    >
                                        Reset photo
                                    </Button>
                                )}
                                <Button
                                    fit_width
                                    onPress={() => onPressRetake()}
                                >
                                    {props.profile_picture_url ? 'Re-Take photo' : 'Take photo'}
                                </Button>
                            </Row>
                        </Row>
                    </Stack>
                ) : (
                    <Stack gap="m">
                        <Box>
                            <ExpoCamera
                                style={{
                                    flex: 1,
                                    aspectRatio: 1,
                                }}
                                ref={(r) => {
                                    if (r) camera = r;
                                }}
                                useCamera2Api={true}
                                type={camera_front ? CameraType.front : CameraType.back}
                                ratio={'1:1'}
                                onCameraReady={onCameraReady}
                            />
                        </Box>
                        <Row justifyContent="center">
                            <Row gap="xl">
                                <Camera.SwitchCameraButton
                                    onPress={() => setCameraFront((prev) => !prev)}
                                />
                                <Camera.TakePhotoButton onPress={takePicture} />
                                <Camera.MediaImage onPress={requestMediaPhoto} />
                            </Row>
                        </Row>
                    </Stack>
                )}
            </Stack>
        </>
    );
};

export { ProfileCamera };
