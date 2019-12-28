// 用于编译时动态生成 ModuleList.js 文件

var fs = require("fs");

const moduleDirPath = __dirname + "/src";
var modules = [];

let files = fs.readdirSync(moduleDirPath);

files.forEach(function (file) {
    // 过滤 Start 模块
    if (file == "Start") 
    {
        return;
    }

    let modulePath = moduleDirPath + "/" + file;

    let stats = fs.statSync(modulePath);

    if(!stats.isDirectory()){
        return;
    }

    // 如果不存在 Module.js 文件
    if(!fs.existsSync(modulePath + "/Module.js")){
        return;
    }

    modules.push({path: modulePath.replace(__dirname + "/src/", "") + "/Module.js", name: file});
});

let importListStr = "// -----该文件由 Webpack 编译时动态生成，请勿直接更改-----\n\n";
let moduleListStr = "";

modules.forEach(function(moduleObject){
    importListStr = importListStr + `import ${moduleObject.name} from "${moduleObject.path}";\n`;
    moduleListStr = moduleListStr + moduleObject.name + ",";
});

importListStr = `${importListStr}\n`;
moduleListStr = `const moduleList = [${moduleListStr}];\n`;
moduleListStr = moduleListStr + `export default moduleList;\n`;

const moduleListFilePath = moduleDirPath + "/Start/ModuleList.js";

fs.writeFileSync(moduleListFilePath, importListStr + moduleListStr);