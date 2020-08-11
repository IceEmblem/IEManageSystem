import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

class ComponentContainerBox extends React.Component {
    constructor(props) {
        super(props);

        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
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
                key={sign + this.props.pageComponent.os}
                sign={sign}
                pageId={this.props.pageId}
                pageDataId={this.props.pageDataId}
                os={this.props.os}
                ComponentContainerBoxShow={this.props.ComponentContainerBoxShow}

                style={this.props.style}
                className={this.props.className}
                propsEX={this.props.propsEX}
                ToolBtn={this.props.ToolBtn}
            >
            </Contain>)
        );
    }

    render() {
        return (
            <this.props.ComponentContainerBoxShow
                style={{ ...this.getStyle(), ...this.props.style(this.props.pageComponent) }}
                className={`${this.getClassName()} ${this.props.className(this.props.pageComponent)}`}
                propsEX={this.props.propsEX(this.props.pageComponent)}
                ToolBtn={
                    this.props.ToolBtn &&
                    <this.props.ToolBtn
                        sign={this.props.sign}
                        pageId={this.props.pageId}
                        pageDataId={this.props.pageDataId}
                        pageComponent={this.props.pageComponent}
                    />
                }
            >
                {
                    this.componentDescribe.createComponent(
                        this.props.pageId,
                        this.props.os,
                        this.props.pageDataId,
                        this.props.sign,
                        this.createChildComponent())
                }
            </this.props.ComponentContainerBoxShow>
        );
    }
}

ComponentContainerBox.propTypes = {
    // 如下属性由父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    sign: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    ComponentContainerBoxShow: PropTypes.func.isRequired,

    // 如下属性为父组件传入，为可选熟悉
    style: PropTypes.func,
    className: PropTypes.func,
    propsEX: PropTypes.func,        // (PageComponent) => {}
    ToolBtn: PropTypes.func,      // react 组件 ({pageId, pageDataId, sign}) => {}

    // 如下熟悉为 redux
    pageComponent: PropTypes.object.isRequired,
}

ComponentContainerBox.defaultProps = {
    style: (pageComponent) => ({}),
    className: (pageComponent) => "",
    propsEX: (pageComponent) => ({}),
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.os][ownProps.sign];

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
)(ComponentContainerBox)

export default Contain;