/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const createModulesFile = require('../../../createModulesFile').createModulesFile;
createModulesFile(
  "../",
  ["RNStart"],
  "Module.js",
  "",
  "../ModuleList.js"
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
  // projectRoot: __dirname + '../../../../'
};
