// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: ["react-native-reanimated/plugin", "nativewind/babel"],
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "nativewind/babel",
      'react-native-paper/babel',
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blockList": null,
        "allowlist": null
      }]
    ],
  };
};
