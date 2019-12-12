import Container from './Container'
import Text from './Text'
import CitiesSlider from './CitiesSlider'
import Groupedcolumn from './Groupedcolumn'
import Donut from './Donut'
import Clock from './Clock'
import RichTextEditor from './RichTextEditor'
import FlipClock from './FlipClock'
import Progress from './Progress'
import PostList from './PostList'
import IELoading from './IELoading'

let ComponentDescribes = null;

export const componentType = {
    container: "container",
    page: "page",
    text: "text",
    graph: "graph"
}

export const componentTypes = [
    { name: componentType.container, text: "容器组件", icon: "oi-box" },
    { name: componentType.page, text: "页面组件", icon: "oi-file" },
    { name: componentType.text, text: "文本组件", icon: "oi-text" },
    { name: componentType.graph, text: "图表组件", icon: "oi-graph" }
];

export default class ComponentFactory {
    constructor() {
        if (ComponentDescribes == null) {
            this.createComponentDescribes();
        }
    }

    createComponentDescribes() {
        ComponentDescribes = [];

        // ComponentDescribes 组件描述，描述组件的类型
        // componentObject 组件对象
        ComponentDescribes.push({ componentObject: new Container(), name: "Container", componentType: componentType.container });

        ComponentDescribes.push({ componentObject: new PostList(), name: "PostList", componentType: componentType.page });

        ComponentDescribes.push({ componentObject: new Text(), name: "Text", componentType: componentType.text });
        ComponentDescribes.push({ componentObject: new RichTextEditor(), name: "RichTextEditor", componentType: componentType.text });

        ComponentDescribes.push({ componentObject: new Groupedcolumn(), name: "Groupedcolumn", componentType: componentType.graph });
        ComponentDescribes.push({ componentObject: new Donut(), name: "Donut", componentType: componentType.graph });
        ComponentDescribes.push({ componentObject: new Clock(), name: "Clock", componentType: componentType.graph });

        ComponentDescribes.push({ componentObject: new CitiesSlider(), name: "CitiesSlider" });
        ComponentDescribes.push({ componentObject: new FlipClock(), name: "FlipClock" });
        ComponentDescribes.push({ componentObject: new Progress(), name: "Progress" });
        ComponentDescribes.push({ componentObject: new IELoading(), name: "IELoading" });
    }
    

    getComponentDescribes() {
        return [...ComponentDescribes];
    }

    getComponentDescribeForName(name) {
        return ComponentDescribes.find(item => item.name == name);
    }
}