// 用于编译时动态生成 ModuleList.js 文件
var fs = require("fs");

exports.createModulesFile = function (
    moduleDirPath, 
    removeNames, 
    moduleFileName,
    importPre,
    moduleOutputPath) 
{
    var modules = [];

    let dirs = fs.readdirSync(moduleDirPath);

    dirs.forEach(function (dir) {
        // 过滤模块
        if(removeNames.some(item => item == dir))
        {
            return;
        }

        let modulePath = moduleDirPath + "/" + dir;

        let stats = fs.statSync(modulePath);

        if (!stats.isDirectory()) {
            return;
        }

        // 如果不存在 Module.js 文件
        if (!fs.existsSync(`${modulePath}/${moduleFileName}`)) {
            return;
        }

        modules.push({ path: `${importPre}${dir}/${moduleFileName}`, name: dir });
    });

    let importListStr = "// -----该文件由 Webpack 编译时动态生成，请勿直接更改-----\n\n";
    let moduleListStr = "";

    modules.forEach(function (moduleObject) {
        importListStr = importListStr + `import ${moduleObject.name} from "${moduleObject.path}";\n`;
        moduleListStr = moduleListStr + moduleObject.name + ",";
    });

    importListStr = `${importListStr}\n`;
    moduleListStr = `const moduleList = [${moduleListStr}];\n`;
    moduleListStr = moduleListStr + `export default moduleList;\n`;

    fs.writeFileSync(moduleOutputPath, importListStr + moduleListStr);
}