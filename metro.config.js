// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.nodeModulesPaths = [
    ...config.resolver.nodeModulesPaths,
    path.resolve(__dirname, 'modules'),
];

config.watchFolders = [path.resolve(__dirname, '.')];

config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
});

module.exports = config;
