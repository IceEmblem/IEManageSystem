import React from 'react'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'
import ComponentContext from 'BaseCMSManage/ComponentContext'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'


class ContainerContain extends React.Component {
    render() {
        let { _containerComponent: Component, containerConfigs, ...props } = this.props;

        if (!containerConfigs) {
            let childs = ({ interactivConfigFeature }) => {
                return <ComponentContext.Provider
                    value={{
                        ...this.context,
                        interactivConfigFeature: interactivConfigFeature
                    }}
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
                            </ComponentContainerBox>))
                    }
                </ComponentContext.Provider>
            };

            return <>
                <Component
                    {...props}
                    isExitChild={this.props.pageComponent.pageComponentSigns.length > 0}
                    ChildComponent={childs}
                >
                </Component>
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
                    return <ComponentContext.Provider
                        value={{
                            ...this.context,
                            interactivConfigFeature: interactivConfigFeature
                        }}
                    >
                        <ComponentContainerBox
                            key={sign + this.props.pageComponent.os}
                            sign={sign}
                            pageId={this.props.pageId}
                            pageDataId={this.props.pageDataId}
                            os={this.props.os}
                        >
                        </ComponentContainerBox>
                    </ComponentContext.Provider>
                };
            })

            return <>
                <Component
                    {...props}
                    isExitChild={this.props.pageComponent.pageComponentSigns.length > 0}
                    ChildComponent={childs}
                >
                </Component>
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