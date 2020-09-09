import React from 'react'
import ComponentContext from 'BaseCMSManage/ComponentContext'

export const InteractiveComponentConfigName = '__InteractiveComponentConfig__';

class ContainerContain extends React.Component {
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

        // 否则获取对应的文本和点击
        let getTextName = this.props.pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData().field1;
        let getClickName = this.props.pageComponent.getOrCreatePageComponentSetting(InteractiveComponentConfigName).getDefauleData().field2;

        return <Component
            {...props}
            interactivText={getTextName && interactivConfigFeature.getText(getTextName)}
            interactivClick={getClickName && interactivConfigFeature.getClick(getClickName)}
        >
        </Component>
    }
}

export default (component) => (props) => {
    return <ContainerContain
        _containerComponent={component}
        {...props}
    />
}