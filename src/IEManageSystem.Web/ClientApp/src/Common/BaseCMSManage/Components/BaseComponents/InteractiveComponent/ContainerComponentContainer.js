import React from 'react'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'
import ComponentContext from 'BaseCMSManage/ComponentContext'
import InteractivConfigFeature from './InteractivConfigFeature'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'


const ClearInteractivConfigFeature = (props) => {
    ComponentContext.current.set(InteractivConfigFeature, undefined);
    return <></>
}

class ContainerContain extends React.Component {
    render() {
        let { _containerComponent: Component, containerConfigs, ...props } = this.props;

        ComponentContext.current.set(InteractivConfigFeature, undefined);

        if (!containerConfigs) {
            let childs = ({ interactivConfigFeature }) => {
                ComponentContext.current.set(InteractivConfigFeature, interactivConfigFeature);

                return this.props.pageComponent.pageComponentSigns.map(sign => (
                    <ComponentContainerBox
                        key={sign + this.props.pageComponent.os}
                        sign={sign}
                        pageId={this.props.pageId}
                        pageDataId={this.props.pageDataId}
                        os={this.props.os}
                    >
                    </ComponentContainerBox>)
                )
            };

            ComponentContext.current.set(InteractivConfigFeature, undefined);

            return <>
                <Component
                    {...props}
                    isExitChild={this.props.pageComponent.pageComponentSigns.length > 0}
                    ChildComponent={childs}
                >
                </Component>
                <ClearInteractivConfigFeature />
            </>;
        }
        else {
            let childs = {};
            this.props.pageComponent.pageComponentSigns.forEach(sign => {
                let group = this.props.pageComponents[sign].group;
                if (!group) {
                    return;
                }

                childs[group] = ({ interactivConfigFeature }) => {
                    ComponentContext.current.set(InteractivConfigFeature, interactivConfigFeature);

                    return <ComponentContainerBox
                        key={sign + this.props.pageComponent.os}
                        sign={sign}
                        pageId={this.props.pageId}
                        pageDataId={this.props.pageDataId}
                        os={this.props.os}
                    >
                    </ComponentContainerBox>
                };
            })

            return <>
                <Component
                    {...props}
                    isExitChild={this.props.pageComponent.pageComponentSigns.length > 0}
                    ChildComponent={childs}
                >
                </Component>
                <ClearInteractivConfigFeature />
            </>;
        }
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponents: state.pageComponents[ownProps.pageId][ownProps.os],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)

export default Contain(ContainerContain);