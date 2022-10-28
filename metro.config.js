const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;

// config.resolver.assetExts.push(
//     // Adds support for `.db` files for SQLite databases
//     'db', 'cjs', 'jsx','js','ts','tsx', 'json'
// );

// module.exports = defaultConfig;



// module.exports = {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//     resolver: {
//       sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'] //add here
//     },
// };