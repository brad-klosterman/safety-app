import { Flex, Text } from '@components/ui';

const EmptyAlarmsStack = () => {
    return (
        <Flex
            padding="m"
            gap="m"
            justifyContent="space-between"
            backgroundColor="background_primary"
        >
            <Text>No Alarms Found</Text>
        </Flex>
    );
};

export { EmptyAlarmsStack };
