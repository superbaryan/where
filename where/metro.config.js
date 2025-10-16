const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

// Exclude unnecessary directories from being watched
config.resolver.blockList = exclusionList([
  /\.git\/.*/,
  /\.cache\/.*/,
  /\.expo\/.*/,
  /\.vscode\/.*/,
]);

// Optimize file watching
config.watchFolders = [__dirname];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

module.exports = withNativeWind(config, { 
  input: './global.css' 
});
