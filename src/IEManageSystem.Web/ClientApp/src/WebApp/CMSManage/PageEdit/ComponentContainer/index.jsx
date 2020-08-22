import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'
import ToolBtns from './ToolBtns';
import Page from 'CMSManage/Home/Page'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'

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
        let { selectedPageComponents, pageId, pageDataId, addChildComponent, os } = this.props;

        if (selectedPageComponents.length == 0) {
            return <></>
        }

        return (
            <div>
                <span style={{ right: 70, bottom: 100, position: "fixed" }} >
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
                                    addChildComponent={addChildComponent}
                                    style={{ opacity: 1, marginBottom: "5px" }}
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

class PageEditCompontContainer extends React.Component {
    state = {
        selectedPageComponents: [],
    }

    selectedPageComponents = [];

    lastSelectedPageComponentSign = null;

    constructor(props) {
        super(props);

        this.Tools = this.Tools.bind(this);
        this.propsEX = this.propsEX.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }

    // 工具按钮
    Tools({ sign, pageId, pageDataId, pageComponent }) {
        return <ToolBtns
            sign={sign}
            os={pageComponent.os}
            pageId={pageId}
            pageDataId={pageDataId}
            pageComponent={pageComponent}
            addChildComponent={this.props.addChildComponent}
        />;
    }

    // 扩展熟悉
    propsEX(pageComponent) {
        return {
            onClick: (e) => {
                this.selectedPageComponents.push({
                    targetElement: e.currentTarget,
                    pageComponent: pageComponent,
                });
            }
        }
    }

    // 扩展样式
    getStyle(pageComponent) {
        return pageComponent.sign == this.props.activePageComponentSign ?
            { backgroundColor: "#1890ff20", }
            : {}
    }

    // 扩展class
    getClassName(pageComponent) {
        return "editableparentcom";
    }

    render() {
        let style = {};
        if (this.props.rootPageComponent.os == PageComponentOSType.Native) {
            style.width = "550px"
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
                        if(this.selectedPageComponents.length == 0){
                            return false;
                        }

                        if(this.lastSelectedPageComponentSign == this.selectedPageComponents[0].pageComponent.sign){
                            this.selectedPageComponents = [];
                            return false;
                        }
                        
                        this.setState({ selectedPageComponents: this.selectedPageComponents });
                        this.lastSelectedPageComponentSign = this.selectedPageComponents[0].pageComponent.sign;
                        this.selectedPageComponents = [];
                        
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
                                        ComponentContainerBoxShow={ComponentContainerBoxShow}

                                        style={this.getStyle}
                                        className={this.getClassName}
                                        propsEX={this.propsEX}
                                        ToolBtn={this.Tools}
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
                    addChildComponent={this.props.addChildComponent}
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
    addChildComponent: PropTypes.func.isRequired,
}

export default PageEditCompontContainer;