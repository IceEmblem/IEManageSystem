import React from 'react'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'

class ContainerContain extends React.Component
{
    render(){
        let {_containerComponent : Component, ...props} = this.props
        return <Component 
            {...props}
        >
            {
                this.props.pageComponent.pageComponentSigns.map(sign => (
                    <ComponentContainerBox
                        key={sign + this.props.pageComponent.os}
                        sign={sign}
                        pageId={this.props.pageId}
                        pageDataId={this.props.pageDataId}
                        os={this.props.os}
                    >
                    </ComponentContainerBox>)
                )
            }
        </Component>
    }
}

export default (component) => (props) => {
    return <ContainerContain 
        _containerComponent={component}
        {...props}
    />
}