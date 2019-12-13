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
import {componentType} from './ComponentDescribe'
import ComponentDescribes from './ComponentDescribeList';

export const componentTypes = [
    { name: componentType.container, text: "容器组件", icon: "oi-box" },
    { name: componentType.page, text: "页面组件", icon: "oi-file" },
    { name: componentType.text, text: "文本组件", icon: "oi-text" },
    { name: componentType.graph, text: "图表组件", icon: "oi-graph" },
    { name: componentType.other, text: "其他组件", icon: "oi-puzzle-piece" }
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
        ComponentDescribes.push(Container);

        ComponentDescribes.push(PostList);

        ComponentDescribes.push(Text);
        ComponentDescribes.push(RichTextEditor);

        ComponentDescribes.push(Groupedcolumn);
        ComponentDescribes.push(Donut);
        ComponentDescribes.push(Clock);

        ComponentDescribes.push(CitiesSlider);
        ComponentDescribes.push(FlipClock);
        ComponentDescribes.push(Progress);
        ComponentDescribes.push(IELoading);
    }
    

    getComponentDescribes() {
        return [...ComponentDescribes];
    }

    getComponentDescribeForName(name) {
        return ComponentDescribes.find(item => item.name == name);
    }
}