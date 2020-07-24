import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from '../Components/ComponentFactory'
import ComponentDataModel from '../../Models/ComponentDataModel'
import PageDataModel from '../../Models/PageDatas/PageDataModel'

import './BaseComponentContainer.css'

const pageDataModel = PageDataModel.CreatePageDataModel();

class BaseComponentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.execLogic = this.execLogic.bind(this);
        this.pageFreshen = this.pageFreshen.bind(this);
        this.componentDescribe = new ComponentFactory().getComponentDescribeForName(this.props.pageComponent.name);
        if (this.componentDescribe) {
            this.componentObject = this.componentDescribe.componentObject;
        }
        else {
            this.componentDescribe = new ComponentFactory().getComponentDescribeForName("NotFind");
            this.componentObject = this.componentDescribe.componentObject;
        }
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

    getContentComponentData() {
        // 如果组件不是内容组件
        if (!this.componentDescribe.isExistDefaultComponentData()) {
            return undefined;
        }

        if (this.props.contentComponentData) {
            return this.props.contentComponentData;
        }

        if (this.props.defaultComponentData) {
            return this.props.defaultComponentData;
        }

        let componentDataModel = { id: 0, sign: this.props.pageComponent.sign, singleDatas: [] };
        componentDataModel.__proto__ = ComponentDataModel.prototype;

        return componentDataModel;
    }

    createChildComponent() {
        return undefined;
    }

    createComponent() {
        return <this.componentObject.Component
            pageComponent={this.props.pageComponent}
            componentData={this.getContentComponentData()}
            pageComponentSettings={this.getPageComponentSettings() || []}
            pageLeafSetting={this.props.pageComponent.pageLeafSetting}
            menuName={this.props.pageComponent.menuName}
            execLogic={this.execLogic}
            pageFreshen={this.pageFreshen}
            page={this.props.page}
            pageData={this.props.pageData || pageDataModel}
        >
            {this.createChildComponent()}
        </this.componentObject.Component>
    }

    getTools() {
        return undefined;
    }

    getPageComponentSettings() {
        // 检查 this.props.pageComponent.pageComponentSettings 是否有对应的配置
        // 没有则实例一个
        this.componentObject.ComponentSettingConfigs.forEach(element => {
            if (!this.props.pageComponent.pageComponentSettings.some(e => e.name == element.name)) {
                this.props.pageComponent.pageComponentSettings.push(
                    { id: 0, name: element.name, displayName: element.displayName, singleDatas: [] }
                );
            }
        });

        return this.props.pageComponent.pageComponentSettings
    }

    pageFreshen() {
        return this.props.pageFreshen(this.props.page.name, this.props.pageData.name);
    }

    // 各自容器需要实现自己的执行逻辑
    execLogic(requestData) {
        return undefined;
    }

    // 各自容器可实现自己需要扩展的props
    propsEX() {
        return {};
    }

    // 各自容器可实现自己需要扩展的style
    styleEX() {
        return {};
    }

    render() {
        return (
            <div style={{ ...this.getStyle(), ...this.styleEX() }} className={`parentcomponent ${this.getClassName()}`}
                {...this.propsEX()}
            >
                {this.createComponent()}
                {this.getTools()}
            </div>
        );
    }
}

BaseComponentContainer.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    defaultComponentData: PropTypes.object,
    contentComponentData: PropTypes.object,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

BaseComponentContainer.defaultProps = {
};

export default BaseComponentContainer;