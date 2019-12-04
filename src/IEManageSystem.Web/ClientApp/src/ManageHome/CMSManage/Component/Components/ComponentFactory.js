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
        ComponentDescribes.push({ componentObject: Container, name: "Container", componentType: componentType.container });

        ComponentDescribes.push({ componentObject: PostList, name: "PostList", componentType: componentType.page });

        ComponentDescribes.push({ componentObject: Text, name: "Text", componentType: componentType.text });
        ComponentDescribes.push({ componentObject: RichTextEditor, name: "RichTextEditor", componentType: componentType.text });

        ComponentDescribes.push({ componentObject: Groupedcolumn, name: "Groupedcolumn", componentType: componentType.graph });
        ComponentDescribes.push({ componentObject: Donut, name: "Donut", componentType: componentType.graph });
        ComponentDescribes.push({ componentObject: Clock, name: "Clock", componentType: componentType.graph });

        ComponentDescribes.push({ componentObject: CitiesSlider, name: "CitiesSlider" });
        ComponentDescribes.push({ componentObject: FlipClock, name: "FlipClock" });
        ComponentDescribes.push({ componentObject: Progress, name: "Progress" });
    }
    

    getComponentDescribes() {
        return [...ComponentDescribes];
    }

    getComponentDescribeForName(name) {
        return ComponentDescribes.find(item => item.name == name);
    }
}