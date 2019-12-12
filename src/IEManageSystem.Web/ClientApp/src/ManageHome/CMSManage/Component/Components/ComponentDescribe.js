export const componentType = {
    container: "container",
    page: "page",
    text: "text",
    graph: "graph",
    other: "other"
}

// 组件描述，每个自定义的组件都应该以组件描述的形式导出
export default class ComponentDescribe {
    constructor(name, componentObject, type = componentType.other){
        if(!name) {
            throw new Error("name 是必须的");
        }

        if(!componentObject) {
            throw new Error("componentObject 是必须的");
        }

        this.name = name;
        this.componentObject = componentObject;
        this.componentType = type;
    }
}