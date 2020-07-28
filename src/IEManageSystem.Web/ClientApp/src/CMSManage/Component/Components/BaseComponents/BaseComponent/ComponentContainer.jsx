import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from '../../../../IEReduxs/CmsRedux'
import ComponentFactory from '../../ComponentFactory'
import { ieReduxFetch } from 'Core/IEReduxFetch'

import ComponentDataModel from '../../../../Models/ComponentDataModel'
import PageDataModel from '../../../../Models/PageDatas/PageDataModel'
import { pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'

const pageDataModel = PageDataModel.CreatePageDataModel();

class ComponentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.execLogic = this.execLogic.bind(this);
        this.pageFreshen = this.pageFreshen.bind(this);
        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
    }

    pageFreshen() {
        return this.props.pageFreshen(this.props.page.name, this.props.pageData.name);
    }

    // 各自容器需要实现自己的执行逻辑
    execLogic(requestData) {
        let postData = {
            logicName: this.props.pageComponent.name,
            pageName: this.props.page.name,
            pageComponentSign: this.props.pageComponent.sign,
            pageDataName: this.props.pageData.name,
            // 有些组件没有组件数据
            contentComponentDataSign: this.props.contentComponentData ? this.props.contentComponentData.sign : "",
            request: requestData
        };

        return ieReduxFetch("/api/LogicExec/ExecLogic", postData);
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

        let componentDataModel = { id: 0, sign: this.props.pageComponent.sign, singleDatas: [] };
        componentDataModel.__proto__ = ComponentDataModel.prototype;

        return componentDataModel;
    }

    getPageComponentSettings() {
        // 检查 this.props.pageComponent.pageComponentSettings 是否有对应的配置
        // 没有则实例一个
        this.componentDescribe.componentObject.ComponentSettingConfigs.forEach(element => {
            if (!this.props.pageComponent.pageComponentSettings.some(e => e.name == element.name)) {
                this.props.pageComponent.pageComponentSettings.push(
                    { id: 0, name: element.name, displayName: element.displayName, singleDatas: [] }
                );
            }
        });

        return this.props.pageComponent.pageComponentSettings
    }

    render(){
        return <this.componentDescribe.componentObject.Component
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
            {this.props.children}
        </this.componentDescribe.componentObject.Component>
    }
}

ComponentContainer.propTypes = {
    // 如下4个属性为父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    sign: PropTypes.string.isRequired,

    pageComponent: PropTypes.object.isRequired,
    defaultComponentData: PropTypes.object,
    contentComponentData: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.sign];
    let defaultComponentData = state.defaultComponentDatas[ownProps.pageId][ownProps.sign];
    let contentComponentData = undefined;

    if(ownProps.pageDataId){
        contentComponentData = state.contentComponentDatas[ownProps.pageDataId][ownProps.sign]
    }

    return {
        pageComponent: pageComponent,
        defaultComponentData: defaultComponentData,
        contentComponentData: contentComponentData,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFreshen: (pageName, pageDataName) => {
            let promises = [dispatch(pageFetch(pageName))];
            if (pageDataName && pageDataName != "") {
                promises.push(dispatch(pageDataFetch(pageName, pageDataName)));
            }
            return Promise.all(promises);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentContainer)

export default Contain;