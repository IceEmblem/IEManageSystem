// 用于编译时动态生成 ComponentDescribeList.js 文件

var fs = require("fs");

const componentsDirPath = 'src/CMSManage/Component/Components'

var componentPaths = [];

fs.readdirSync(componentsDirPath).forEach(function (templateDir) {
    // 过滤掉其他非组件文件夹
    if (!templateDir.endsWith("TemplateComponents")) {
        return;
    }

    let templatePath = componentsDirPath + "/" + templateDir;

    fs.readdirSync(templatePath).forEach(function (componentDir) {
        let componentPath = templatePath + "/" + componentDir;

        let stats = fs.statSync(componentPath);

        if (stats.isDirectory()) {
            componentPaths.push(componentPath.replace("src/", ""));
        }
    });
});

let importListStr = "// -----该文件由 Webpack 编译时动态生成，请勿直接更改-----\n\n";
let componentListStr = "";

const componentNameRegex = /[^/]+$/;
componentPaths.forEach(function (componentPath) {
    let matchs = componentNameRegex.exec(componentPath);
    if (matchs.length != 1) {
        throw new Error("编译时获取组件名称失败");
    }

    let name = matchs[0];
    importListStr = importListStr + `import ${name} from "${componentPath}";\n`;
    componentListStr = componentListStr + name + ",";
});

importListStr = `${importListStr}\n`;
componentListStr = `const componentDescribes = [${componentListStr}];\n`;
componentListStr = componentListStr + `export default componentDescribes;\n`;

const componentDescribesPath = componentsDirPath + "/ComponentDescribeList.js";

fs.writeFileSync(componentDescribesPath, importListStr + componentListStr);