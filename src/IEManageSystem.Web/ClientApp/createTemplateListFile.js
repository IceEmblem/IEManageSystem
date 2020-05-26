// 用于编译时动态生成 TemplateList.js 文件

var fs = require("fs");

const templateDirPath = __dirname + '/src/CMSManage/Component/Components'

var templatePaths = [];

fs.readdirSync(templateDirPath).forEach(function (templateDir) {
    // 过滤掉其他非组件文件夹
    if (!templateDir.endsWith("TemplateComponents")) {
        return;
    }

    let templatePath = templateDirPath + "/" + templateDir;

    let stats = fs.statSync(templatePath);

    if (stats.isDirectory()) {
        templatePaths.push(templatePath.replace(__dirname + "/src/", ""));
    }
});

let importListStr = "// -----该文件由 Webpack 编译时动态生成，请勿直接更改-----\n\n";
let templateListStr = "";

const templateNameRegex = /[^/]+$/;
templatePaths.forEach(function (componentPath) {
    let matchs = templateNameRegex.exec(componentPath);
    if (matchs.length != 1) {
        throw new Error("编译时获取模板名称失败");
    }

    let name = matchs[0];
    importListStr = importListStr + `import ${name} from "${componentPath}";\n`;
    templateListStr = templateListStr + name + ",";
});

importListStr = `${importListStr}\n`;
templateListStr = `const templates = [${templateListStr}];\n`;
templateListStr = templateListStr + `export default templates;\n`;

const templateListFilePath = templateDirPath + "/TemplateList.js";

fs.writeFileSync(templateListFilePath, importListStr + templateListStr);