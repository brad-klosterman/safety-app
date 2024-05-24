module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    extensions: ['.tsx', '.ts', '.js', '.json'],
                    alias: {
                        '@api': './app/api',
                        '@state': './app/app.state',
                        '@events': './app/EventManager',
                        '@navigation': './app/navigation',
                        '@navigation/*': './app/navigation/*',
                        '@screens': './app/screens',
                        '@screens/*': './app/screens/*',
                        '@theme': './app/theme',
                        '@theme/*': './app/theme/*',
                        '@components': './app/components',
                        '@components/*': './app/components/*',
                        '@utils': './app/utils',
                        '@utils/*': './app/utils/*',
                        '@device': './app/utils/device',
                    },
                },
            ],
            'transform-inline-environment-variables',
        ],
    };
};
