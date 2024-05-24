import { ReactElement } from 'react';
import type { ThemeColor } from '@theme';
import { type IconName } from '@components/ui';
// import { ActionItem } from './ActionItem';

interface ActionSheetProps {
    children: ReactElement<ActionItemProps> | ReactElement<ActionItemProps>[];
}

interface ActionItemProps {
    position: ActionItemPosition;
    label?: string;
    value?: string | null;
    onPress?: () => void;
    type: ActionItemType;
    children?: ReactElement;
    color?: ThemeColor;
    icon?: IconName;
}
type ActionItemPosition = 'top' | 'middle' | 'bottom' | 'single';

type ActionItemType = 'nav' | 'input' | 'nav_input' | 'select' | 'switch' | 'info';

export type { ActionSheetProps, ActionItemProps, ActionItemPosition, ActionItemType };
