import {componentType} from './ComponentDescribe'
import ComponentDescribes from './ComponentDescribeList';

export const componentTypes = [
    { name: componentType.container, text: "容器组件", icon: "oi-box" },
    { name: componentType.menu, text: "菜单组件", icon: "oi-list" },
    { name: componentType.page, text: "页面组件", icon: "oi-file" },
    { name: componentType.text, text: "文本组件", icon: "oi-text" },
    { name: componentType.graph, text: "图表组件", icon: "oi-graph" },
    { name: componentType.other, text: "其他组件", icon: "oi-puzzle-piece" }
];

export default class ComponentFactory {
    constructor() {
    }

    getComponentDescribes() {
        return [...ComponentDescribes];
    }

    getComponentDescribeForName(name) {
        return ComponentDescribes.find(item => item.name == name);
    }
}