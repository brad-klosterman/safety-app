import React from 'react';

import { HeaderButton } from './HeaderButton';
import { HeaderBackArrow } from './HeaderIcons';
import type { HeaderButtonProps } from './type.Header';

function HeaderLeft({
    title = 'Back',
    ...props
}: Omit<HeaderButtonProps, 'children'> & {
    title?: string;
    /**
     * Function which returns a React Element to display an icon
     */
    renderIcon?: (() => React.ReactElement) | 'back';
}) {
    const renderIcon = () => {
        if (props.renderIcon === 'back') {
            return <HeaderBackArrow />;
        } else if (props.renderIcon) {
            return props.renderIcon();
        } else {
            return null;
        }
    };

    return (
        <HeaderButton onPress={props.onPress}>
            {renderIcon()}
            <HeaderButton.Title title={title} />
        </HeaderButton>
    );
}

export { HeaderLeft };
