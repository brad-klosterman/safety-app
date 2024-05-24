import * as React from 'react';

type Route = {
    key: string;
    icon?: string;
    title?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    testID?: string;
};

type Scene<T extends Route> = {
    route: T;
};
type Layout = {
    width: number;
    height: number;
};

type SceneRendererProps = {
    layout: Layout;
    // position: Animated.AnimatedInterpolation<number>;
    jumpTo: (key: string) => void;
};

type SceneProps = {
    route: any;
} & Omit<SceneRendererProps, 'layout'>;

const SceneComponent = React.memo(
    <T extends { component: React.ComponentType<any> } & SceneProps>({ component, ...rest }: T) => {
        return React.createElement(component, rest);
    }
);

function SceneMap<T>(scenes: { [key: string]: React.ComponentType<T> }) {
    return ({ route, jumpTo }: SceneProps) => (
        <SceneComponent
            key={route.key}
            component={scenes[route.key]}
            route={route}
            jumpTo={jumpTo}
        />
    );
}
