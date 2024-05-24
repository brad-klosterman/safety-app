import React from 'react';
import { HeaderNextArrow } from './HeaderIcons';
import type { HeaderButtonProps } from './type.Header';

import { HeaderButton } from './HeaderButton';

type HeaderRightProps = Omit<HeaderButtonProps, 'children'> & {
    title: string;
    /**
     * Function which returns a React Element to display icon
     */
    renderIcon?: (() => React.ReactElement) | 'continue';
};
function HeaderRight({ title, ...props }: HeaderRightProps) {
    const renderIcon = () => {
        if (props.renderIcon === 'continue') {
            return <HeaderNextArrow />;
        } else if (props.renderIcon) {
            return props.renderIcon();
        } else {
            return null;
        }
    };

    return (
        <HeaderButton {...props}>
            <HeaderButton.Title title={title} />
            {renderIcon()}
        </HeaderButton>
    );
}

export type { HeaderRightProps };
export { HeaderRight };
