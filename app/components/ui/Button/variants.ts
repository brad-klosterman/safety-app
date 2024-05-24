const BUTTON_VARIANTS = {
    defaults: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 'm',
        paddingLeft: 's',
        paddingRight: 's',
        height: 50,
        color: 'label_color_primary',
    },
    primary: {
        backgroundColor: 'emphasis',
        borderColor: 'emphasis',
        color: 'label_color_primary',
    },
    secondary: {
        borderColor: 'emphasis',
        color: 'emphasis',
    },
    danger: {
        backgroundColor: 'danger',
        borderColor: 'danger',
        color: 'label_color_primary',
    },
    danger_secondary: {
        borderColor: 'danger',
        color: 'danger',
    },
    ghost_primary: {
        borderWidth: 0,
        color: 'emphasis',
        paddingLeft: 'none',
        paddingRight: 'none',
        fontFamily: 'Inter_500Medium',
        fontWeight: '500',
        //paddingTop: 'none',
        //paddingBottom: 'none',
    },
    ghost_danger: {
        borderWidth: 0,
        color: 'danger',
        paddingLeft: 'none',
        paddingRight: 'none',
        fontFamily: 'Inter_500Medium',
        fontWeight: '500',
        //paddingTop: 'none',
        //paddingBottom: 'none',
    },
} as const;

export { BUTTON_VARIANTS };
