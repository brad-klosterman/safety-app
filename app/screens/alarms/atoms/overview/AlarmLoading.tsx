import { Stack, Text, ProgressIndicator } from '@components/ui';

function AlarmLoading(props: { visible: boolean }) {
    if (!props.visible) {
        return null;
    }
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            gap="xs"
            flex={1}
        >
            <Text
                color="text_secondary"
                variant="caption_1_bold"
                textAlign="center"
                style={{ letterSpacing: 3 }}
            >
                UPDATING ALARM
            </Text>
            <ProgressIndicator
                duration={1000}
                itemWidth={16}
                itemHeight={8}
                itemsOffset={4}
                topScale={4}
            />
        </Stack>
    );
}

export { AlarmLoading };
