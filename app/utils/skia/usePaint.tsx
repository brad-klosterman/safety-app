import { Blur, ColorMatrix, Paint } from '@shopify/react-native-skia';
import React, { useMemo } from 'react';

export const usePaint = () => {
    return useMemo(() => {
        return (
            <Paint>
                <Blur blur={4} />
                <ColorMatrix
                    matrix={[
                        // R, G, B, A, Position
                        ...[1, 0, 0, 0, 0],
                        ...[0, 1, 0, 0, 0],
                        ...[0, 0, 1, 0, 0],
                        ...[0, 0, 0, 18, -7],
                    ]}
                />
            </Paint>
        );
    }, []);
};
