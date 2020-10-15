import React from 'react'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'

export const ContainerSettingName = '__ContainerSetting__';

class ContainerContain extends React.Component {
    render() {
        let { _containerComponent: Component, containerConfigs, ...props } = this.props;

        if (!containerConfigs) {
            return <Component
                {...props}
            >
                {
                    this.props.pageComponent.pageComponentSigns.map(sign => (
                        <ComponentContainerBox
                            key={sign + this.props.pageComponent.os}
                            sign={sign}
                            currentPageAndPost={this.props.currentPageAndPost}
                        >
                        </ComponentContainerBox>)
                    )
                }
            </Component>
        }

        let childs = {};
        containerConfigs.forEach(item => {
            if(item.list == true){
                childs[item.name] = [];
            }
            else{
                childs[item.name] = undefined;
            }
        })
        this.props.pageComponent.pageComponentSigns.forEach(sign => {
            let group = this.props.pageComponents[sign].group;
            if(!group){
                return;
            }

            if(childs[group]){
                childs[group].push(<ComponentContainerBox
                    key={sign + this.props.pageComponent.os}
                    sign={sign}
                    currentPageAndPost={this.props.currentPageAndPost}
                >
                </ComponentContainerBox>);
            }
            else{
                childs[group] = (
                    <ComponentContainerBox
                        key={sign + this.props.pageComponent.os}
                        sign={sign}
                        currentPageAndPost={this.props.currentPageAndPost}
                    >
                    </ComponentContainerBox>)
            }
        })

        return (<Component
            {...props}
        >
            {childs}
        </Component>)
    }
}

export default (props) => {
    return <ContainerContain 
        {...props}
        pageComponents={props.currentPageAndPost.pageComponents}
    />
}