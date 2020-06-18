import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from '../Components/ComponentFactory'
import PageComponentSettingModel from 'CMSManage/Models/Pages/PageComponentSettingModel'
import ComponentDataModel from 'CMSManage/Models/ComponentDataModel'
import BaseContentLeafComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'

import './BaseComponentContainer.css'

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

        style = {...style, ...this.componentDescribe.defauleStyle}

        if (this.props.pageComponent.pageComponentBaseSetting.width) {
            style.width = this.props.pageComponent.pageComponentBaseSetting.width;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.backgroundImage) {
            style.backgroundImage = `url(${this.props.pageComponent.pageComponentBaseSetting.backgroundImage})`;
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

    getContentComponentData(){
        // 如果组件不是内容组件
        if (!(this.componentObject instanceof BaseContentLeafComponentObject)) {
            return undefined;
        }

        if(this.props.contentComponentData){
            return this.props.contentComponentData;
        }
        
        if(this.props.defaultComponentData){
            return new ComponentDataModel(this.props.defaultComponentData);
        }

        return new ComponentDataModel({id: 0, sign: this.props.pageComponent.sign, singleDatas: []});
    }

    createChildComponent() {
        return undefined;
    }

    createComponent() {
        return this.componentObject.Component({
            componentData: this.getContentComponentData(),
            pageComponentSettings: this.getPageComponentSettings() || [],
            pageLeafSetting: this.props.pageComponent.pageLeafSetting,
            menuName: this.props.pageComponent.menuName,
            execLogic: this.execLogic,
            pageFreshen: this.pageFreshen
        }, this.createChildComponent())
    }

    getTools() {
        return undefined;
    }

    getPageComponentSettings() {
        // 检查 this.props.pageComponent.pageComponentSettings 是否有对应的配置
        // 没有则实例一个
        this.componentObject.ComponentSettingConfigs.forEach(element => {
            if(!this.props.pageComponent.pageComponentSettings.some(e=>e.name == element.name)){
                this.props.pageComponent.pageComponentSettings.push(
                    PageComponentSettingModel.createDefaultSettingData(element.name, element.displayName)
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

    render() {
        return (
            <div style={this.getStyle()} className={`parentcomponent ${this.getClassName()}`}>
                {this.createComponent()}
                {this.getTools()}
            </div>
        );
    }
}

BaseComponentContainer.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    defaultComponentData: PropTypes.object.isRequired,
    contentComponentData: PropTypes.object,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

BaseComponentContainer.defaultProps = {
};

export default BaseComponentContainer;