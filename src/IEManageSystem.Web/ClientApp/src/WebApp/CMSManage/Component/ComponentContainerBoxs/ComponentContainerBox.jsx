import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from '../Components/ComponentFactory'
import ComponentDataModel from '../../Models/ComponentDataModel'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './ComponentContainerBox.css'

class BaseComponentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
    }

    getContentComponentData() {
        // 如果组件不是内容组件
        if (!this.componentDescribe.isExistComponentData()) {
            return undefined;
        }

        if (this.props.contentComponentData) {
            return this.props.contentComponentData;
        }

        if (this.props.defaultComponentData) {
            return this.props.defaultComponentData;
        }

        return ComponentDataModel.CreateDefaultComponentData(this.props.sign);
    }

    getStyle() {
        let style =
        {
            padding: "0rem"
        }

        style.width = "100%";

        style = { ...style, ...this.componentDescribe.defauleStyle }

        if (this.props.pageComponent.pageComponentBaseSetting.width) {
            style.width = this.props.pageComponent.pageComponentBaseSetting.width;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.backgroundImage) {
            style.backgroundImage = `url(${this.props.pageComponent.pageComponentBaseSetting.backgroundImage})`;
            style.backgroundRepeat = "no-repeat"
            style.backgroundSize = "100% auto";
        }

        if (this.props.pageComponent.pageComponentBaseSetting.height) {
            style.height = this.props.pageComponent.pageComponentBaseSetting.height;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.padding) {
            style.padding = this.props.pageComponent.pageComponentBaseSetting.padding;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.margin) {
            style.margin = this.props.pageComponent.pageComponentBaseSetting.margin;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.backgroundColor) {
            style.backgroundColor = this.props.pageComponent.pageComponentBaseSetting.backgroundColor;
        }

        return style;
    }

    getClassName() {
        let className = `${this.props.pageComponent.pageComponentBaseSetting.className || ""}`;

        return className;
    }

    createChildComponent() {
        return this.props.pageComponent.pageComponentSigns.map(sign => (
            <Contain
                key={sign}
                sign={sign}
                pageId={this.props.pageId}
                pageDataId={this.props.pageDataId}

                style={this.props.style}
                className={this.props.className}
                propsEX={this.props.propsEX}
                ToolBtn={this.props.ToolBtn}
            >
            </Contain>)
        );
    }

    getTools() {
        return undefined;
    }

    // 各自容器可实现自己需要扩展的props
    propsEX() {
        return {};
    }

    render() {
        return (
            <div
                style={{ ...this.getStyle(), ...this.props.style(this.props.pageComponent) }}
                className={`parentcomponent ${this.getClassName()} ${this.props.className(this.props.pageComponent)}`}
                {...this.props.propsEX(this.props.pageComponent)}
            >
                {
                    this.componentDescribe.createComponent(
                        this.props.pageId,
                        this.props.pageDataId,
                        this.props.sign,
                        this.createChildComponent())
                }
                {
                    this.props.ToolBtn &&
                    <this.props.ToolBtn
                        sign={this.props.sign}
                        pageId={this.props.pageId}
                        pageDataId={this.props.pageDataId}
                    />
                }
            </div>
        );
    }
}

BaseComponentContainer.propTypes = {
    // 如下 3 个属性由父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    sign: PropTypes.string.isRequired,

    // 如下属性为父组件传入，为可选熟悉
    style: PropTypes.func,
    className: PropTypes.func,
    propsEX: PropTypes.func,        // (PageComponent) => {}
    ToolBtn: PropTypes.func,      // react 组件 ({pageId, pageDataId, sign}) => {}

    // 如下熟悉为 redux
    pageComponent: PropTypes.object.isRequired,
}

BaseComponentContainer.defaultProps = {
    style: (pageComponent)=>({}),
    className: (pageComponent)=>({}),
    propsEX: (pageComponent)=>({}),
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.sign];

    return {
        pageComponent: pageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(BaseComponentContainer)

export default Contain;