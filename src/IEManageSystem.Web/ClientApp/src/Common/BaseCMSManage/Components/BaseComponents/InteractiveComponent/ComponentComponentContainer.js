import React from 'react'
import ComponentContext from 'BaseCMSManage/ComponentContext'

export default class ContainerContain extends React.Component {
    static contextType = ComponentContext;

    render() {
        let { _containerComponent: Component, ...props } = this.props

        let interactivConfigFeature = this.context.interactivConfigFeature;
        
        // 如果当前上下文中没有特征配置，则说明当前当前组件不在交互容器内
        if (!interactivConfigFeature) {
            return <Component
                {...props}
            >
            </Component>
        }

        // 否则获取对应的数据
        let propsData = {};
        this.props.interactiveTypes.forEach(item => {
            item.setComponentPropsData(this.props.pageComponent, interactivConfigFeature, propsData);
        });

        return <Component
            {...props}
            {...propsData}
        >
        </Component>
    }
}