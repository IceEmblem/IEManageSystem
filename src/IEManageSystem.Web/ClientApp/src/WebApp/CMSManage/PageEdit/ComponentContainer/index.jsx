import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'
import ToolBtns from './ToolBtns';
import Page from 'CMSManage/Home/Page'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'
import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

// 标记框，用于标记当前活跃的组件位置
class SignSquareFrame extends React.Component {
    getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    }

    getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    }

    render() {
        if (!this.props.targetElement) {
            return <div></div>
        }

        let style = {
            position: "absolute",
            border: `1px solid ${this.props.color}`,
        }

        let left = this.getElementLeft(this.props.targetElement);
        let top = this.getElementTop(this.props.targetElement);
        let width = this.props.targetElement.clientWidth - 2;
        let height = this.props.targetElement.clientHeight - 2;

        return <div>
            <span style={{ ...{ left: left, top: top, width: width }, ...style }}></span>
            <span style={{ ...{ left: left + width, top: top, height: height }, ...style }}></span>
            <span style={{ ...{ left: left, top: top + height, width: width }, ...style }}></span>
            <span style={{ ...{ left: left, top: top, height: height }, ...style }}></span>
        </div>
    }
}

class CurrentToolBtns extends React.Component {
    state = {
        targetElement: undefined
    }

    render() {
        let { selectedPageComponents, pageId, pageDataId, os } = this.props;

        if (selectedPageComponents.length == 0) {
            return <></>
        }

        return (
            <div>
                <span style={{ right: 80, bottom: 120, position: "fixed" }} >
                    {
                        selectedPageComponents.map(item => (
                            <div
                                onMouseEnter={() => {
                                    this.setState({ targetElement: item.targetElement });
                                }}
                            >
                                <ToolBtns
                                    key={item.pageComponent.sign}
                                    os={item.pageComponent.os}
                                    sign={item.pageComponent.sign}
                                    pageId={pageId}
                                    pageDataId={pageDataId}
                                    style={{ opacity: 1, marginBottom: "5px" }}
                                    placement={'left'}
                                />
                            </div>
                        ))
                    }
                </span>
                <SignSquareFrame
                    targetElement={this.state.targetElement}
                    color="#ff7a45"
                />
            </div>
        );
    }
}

var selectedPageComponents = [];
class EditComponentContainerBoxShow extends React.Component {
    // 扩展熟悉
    propsEX(pageComponent) {
        return {
            onClick: (e) => {
                selectedPageComponents.push({
                    targetElement: e.currentTarget,
                    pageComponent: pageComponent,
                });
            }
        }
    }

    render() {
        return <ComponentContainerBoxShow
            style={{ ...this.props.style }}
            className={`${this.props.className} pageedit-componentcontainer`}
            propsEX={this.propsEX(this.props.pageComponent)}
            ToolBtn={
                <ToolBtns
                    sign={this.props.sign}
                    pageId={this.props.pageId}
                    pageDataId={this.props.pageDataId}
                    os={this.props.os}
                />
            }
        >
            {this.props.children}
        </ComponentContainerBoxShow>
    }
}

class PageEditCompontContainer extends React.Component {
    state = {
        selectedPageComponents: [],
    }

    lastSelectedPageComponentSign = null;

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, EditComponentContainerBoxShow)
    }

    render() {
        let style = {};
        if (this.props.rootPageComponent.os == PageComponentOSType.Native) {
            style.width = "400px"
            style.margin = "auto"
        }
        return (
            <div
                className="w-100 h-100"
                style={{ overflowY: "auto" }}
            >
                <div
                    className="w-100 h-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (selectedPageComponents.length == 0) {
                            return false;
                        }

                        if (this.lastSelectedPageComponentSign == selectedPageComponents[0].pageComponent.sign) {
                            selectedPageComponents = [];
                            return false;
                        }

                        this.setState({ selectedPageComponents: selectedPageComponents });
                        this.lastSelectedPageComponentSign = selectedPageComponents[0].pageComponent.sign;
                        selectedPageComponents = [];

                        return false;
                    }}
                >
                    <Page style={style}>
                        {
                            this.props.rootPageComponent.pageComponentSigns.map(sign => (
                                <>
                                    <ComponentContainerBox
                                        key={sign + this.props.rootPageComponent.os}
                                        sign={sign}
                                        pageId={this.props.pageId}
                                        pageDataId={this.props.pageDataId}
                                        os={this.props.rootPageComponent.os}
                                    >
                                    </ComponentContainerBox>
                                </>
                            ))
                        }
                        <SignSquareFrame
                            targetElement={this.state.selectedPageComponents.length > 0 ?
                                this.state.selectedPageComponents[0].targetElement
                                : undefined
                            }
                            color="#13c2c2"
                        />
                    </Page>
                </div>
                <CurrentToolBtns
                    pageId={this.props.pageId}
                    pageDataId={this.props.pageDataId}
                    os={this.props.rootPageComponent.os}
                    selectedPageComponents={this.state.selectedPageComponents}
                />
            </div>
        );
    }
}

PageEditCompontContainer.propTypes = {
    // 如下3个属性为父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    rootPageComponent: PropTypes.object.isRequired,
}

export default PageEditCompontContainer;