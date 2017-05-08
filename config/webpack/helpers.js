const path = require("path");

const root = (pathToResolve) => {
  return path.join(process.cwd(), pathToResolve);
};

const nodeModulesPath = root("node_modules");
const srcPath = root("src");
const appPath = root("src/app");

module.exports = {
  root,
  nodeModulesPath,
  srcPath,
  appPath
};
