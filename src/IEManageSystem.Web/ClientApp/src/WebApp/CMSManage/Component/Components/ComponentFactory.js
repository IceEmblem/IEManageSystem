import {componentType} from './ComponentDescribe'
import ComponentDescribes from './ComponentDescribeList';

export const componentTypes = [
    { name: componentType.container, text: "容器组件", icon: "oi-box" },
    { name: componentType.nav, text: "导航组件", icon: "oi-home" },
    { name: componentType.menu, text: "菜单组件", icon: "oi-list" },
    { name: componentType.page, text: "文章列表组件", icon: "oi-file" },
    { name: componentType.text, text: "文本组件", icon: "oi-text" },
    { name: componentType.graph, text: "图表组件", icon: "oi-graph" },
    { name: componentType.other, text: "其他组件", icon: "oi-puzzle-piece" }
];

const ComponentDescribeMaps = new Map();
ComponentDescribes.forEach(item => { 
    ComponentDescribeMaps[item.name] = item;
})

class ComponentFactory {
    constructor() {
    }

    getComponentDescribes() {
        return [...ComponentDescribes];
    }

    getComponentDescribeForName(name) {
        let componentDescribe = ComponentDescribeMaps[name];
        if (!componentDescribe) {
            return ComponentDescribeMaps["NotFind"];
        }

        return componentDescribe;
    }
}

const componentFactory = new ComponentFactory();

export default componentFactory;