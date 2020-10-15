import React from 'react'
import ComponentDescribe, {componentType} from './ComponentDescribe'

export const componentTypes = [
    { name: componentType.container, text: "容器组件", icon: "oi-box" },
    { name: componentType.nav, text: "导航组件", icon: "oi-home" },
    { name: componentType.menu, text: "菜单组件", icon: "oi-list" },
    { name: componentType.page, text: "文章列表组件", icon: "oi-file" },
    { name: componentType.text, text: "文本组件", icon: "oi-text" },
    { name: componentType.graph, text: "图表组件", icon: "oi-graph" },
    { name: componentType.other, text: "其他组件", icon: "oi-puzzle-piece" }
];

export class IInvalidOSComponent extends React.Component {}
IInvalidOSComponent.iocKey = Symbol()

class ComponentFactory {
    Previews = undefined;
    TemplateList = [];
    ComponentDescribes = [];
    ComponentDescribeMaps = new Map();

    register(templateList, invalidOSComponent){
        this.Previews = undefined;
        this.TemplateList = templateList;
        this.ComponentDescribes = [];
        this.ComponentDescribeMaps = new Map();
        
        this.TemplateList.forEach(item => {
            this.ComponentDescribes = this.ComponentDescribes.concat(item.componentDescribes);
        })
        
        this.ComponentDescribes.forEach(item => { 
            this.ComponentDescribeMaps[item.name] = item;
        })

        ComponentDescribe.setInvalidOSComponentType(invalidOSComponent);
    }

    getPreviews(){
        if(this.Previews){
            return this.Previews;
        }

        this.Previews = {};

        this.ComponentDescribes.map(item=>{
            if(item.componentObject.Preview){
                this.Previews[item.name] = <item.componentObject.Preview />;
            }
        });

        return this.Previews;
    }

    getComponentDescribes() {
        return [...this.ComponentDescribes];
    }

    getComponentDescribeForName(name) {
        let componentDescribe = this.ComponentDescribeMaps[name];
        if (!componentDescribe) {
            return this.ComponentDescribeMaps["NotFind"];
        }

        return componentDescribe;
    }
}

const componentFactory = new ComponentFactory();
export default componentFactory;