import React from 'react';
import { Stack } from '@components/ui';

import { ActionItem } from './ActionItem';
import type { ActionSheetProps } from './types';

/**
 *  Action Sheet
 *   -----
 *
 **/
function ActionSheet(props: ActionSheetProps) {
    return (
        <Stack
            borderRadius="l"
            backgroundColor="background_elevated_primary"
            width="100%"
        >
            {props.children}
        </Stack>
    );
}

ActionSheet.Item = ActionItem;

export default ActionSheet;
