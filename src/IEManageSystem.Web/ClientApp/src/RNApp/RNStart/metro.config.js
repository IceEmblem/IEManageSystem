/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const createModulesFile = require('./config/createModulesFile').createModulesFile;
createModulesFile(
  "src/RNApp",
  ["RNStart"],
  "Module.js",
  "",
  "src/RNApp/ModuleList.js"
);
createModulesFile(
  "src/Common",
  [],
  "Module.js",
  "",
  "src/Common/ModuleList.js"
);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  // projectRoot: 'src/RNApp/RNStart'
};
