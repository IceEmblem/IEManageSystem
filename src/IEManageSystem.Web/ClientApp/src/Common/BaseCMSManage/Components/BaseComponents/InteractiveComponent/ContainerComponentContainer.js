import React from 'react'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'
import ComponentContext from 'BaseCMSManage/ComponentContext'

export default class ContainerContain extends React.Component {
    render() {
        let { _containerComponent: Component, containerConfigs, ...props } = this.props;

        if (!containerConfigs) {
            let childs = ({ interactivConfigFeature, currentPageAndPost }) => {
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
                                currentPageAndPost={currentPageAndPost || this.props.currentPageAndPost}
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
            let pageComponents = this.props.currentPageAndPost.pageComponents;

            let childs = {};
            this.props.pageComponent.pageComponentSigns.forEach(sign => {
                let group = pageComponents[sign].group;
                if (!group) {
                    return;
                }

                childs[group] = ({ interactivConfigFeature, currentPageAndPost }) => {
                    return <ComponentContext.Provider
                        value={{
                            ...this.context,
                            interactivConfigFeature: interactivConfigFeature
                        }}
                    >
                        <ComponentContainerBox
                            key={sign + this.props.pageComponent.os}
                            sign={sign}
                            currentPageAndPost={currentPageAndPost || this.props.currentPageAndPost}
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