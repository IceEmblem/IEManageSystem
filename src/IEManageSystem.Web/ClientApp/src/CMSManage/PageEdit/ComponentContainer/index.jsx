import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

import ComponentContainerBox from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBox'
import ToolBtns from './ToolBtns';
import Page from 'CMSManage/Home/Page'

// 标记框，用于标记当前活跃的组件位置
class SignSquareFrame extends React.Component {
    render() {
        if (!this.props.targetElement) {
            return <div></div>
        }

        let style = {
            position: "absolute",
            border: `1px solid ${this.props.color}`,
            maxHeight: "100hv"
        }

        // 计算方框的绘画范围
        // 必须在浏览器可视范围内，否则会出现多余的滚动条
        var rect = this.props.targetElement.getBoundingClientRect();

        let left = rect.left;
        let right = rect.right;
        let top = rect.top < 0 ? 0 : rect.top;
        let bottom = (rect.bottom > window.innerHeight ? window.innerHeight : rect.bottom) - 2;

        return <div>
            <span style={{ ...{ left: left, top: top, width: right-left }, ...style }}></span>
            <span style={{ ...{ left: right, top: top, height: bottom-top }, ...style }}></span>
            <span style={{ ...{ left: left, top: bottom, width: right-left }, ...style }}></span>
            <span style={{ ...{ left: left, top: top, height: bottom-top }, ...style }}></span>
        </div>
    }
}

class CurrentToolBtns extends React.Component {
    state = {
        targetElement: undefined
    }

    render() {
        let { selectedPageComponents, pageId, pageDataId, addChildComponent } = this.props;

        if (selectedPageComponents.length == 0) {
            return <></>
        }

        return (
            <div>
                <span style={{ right: 60, bottom: 100, position: "absolute" }} >
                    {
                        selectedPageComponents.map(item => (
                            <div
                                onMouseEnter={() => {
                                    this.setState({ targetElement: item.targetElement });
                                }}
                            >
                                <ToolBtns
                                    key={item.pageComponent.sign}
                                    sign={item.pageComponent.sign}
                                    pageId={pageId}
                                    pageDataId={pageDataId}
                                    addChildComponent={addChildComponent}
                                    className="editableparentcom-btns-active mb-1"
                                    style={{ width: "auto" }}
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

    selectedPageComponents = []

    constructor(props) {
        super(props);

        this.Tools = this.Tools.bind(this);
        this.propsEX = this.propsEX.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }

    // 工具按钮
    Tools({ sign, pageId, pageDataId }) {
        return <ToolBtns
            sign={sign}
            pageId={pageId}
            pageDataId={pageDataId}
            addChildComponent={this.props.addChildComponent}
            className="editableparentcom-btns-transform"
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
        return (
            <div
                className="w-100 h-100"
                style={{ overflowY: "auto" }}
                onScroll={() => this.setState({})}
            >
                <div
                    className="w-100 h-100"
                    onClick={(e) => {
                        this.setState({ selectedPageComponents: this.selectedPageComponents });
                        this.selectedPageComponents = [];
                        e.stopPropagation();
                        return false;
                    }}
                >
                    <Page>
                        {
                            this.props.rootPageComponent.pageComponentSigns.map(sign => (
                                <>
                                    <ComponentContainerBox
                                        key={sign}
                                        sign={sign}
                                        pageId={this.props.pageId}
                                        pageDataId={this.props.pageDataId}

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