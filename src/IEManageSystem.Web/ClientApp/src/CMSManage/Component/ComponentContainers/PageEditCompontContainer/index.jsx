import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import { 
    RemoveComponentAction,
    EditComponentAction,
    pageFetch, 
    pageDataFetch, 
    DefaultComponentDataUpdateAction, 
    setActiveComponent 
} from 'CMSManage/IEReduxs/Actions'

import './index.css'

import PageEditFrame from '../PageEditFrame'
import PostEditFrame from '../PostEditFrame'

import BaseComponentContainer from '../BaseComponentContainer'

import ToolBtns from './ToolBtns';

class PageEditCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            openEdit: false,
            showPostEdit: false
        }
    }

    createChildComponent() {
        return this.props.pageComponent.pageComponentSigns.map(sign => (
            <Contain
                key={sign}
                sign={sign}
                pageId={this.props.pageId}
                addChildComponent={this.props.addChildComponent}
            >
            </Contain>)
        );
    }

    getTools() {
        // PageLeafBaseSetting
        let tools = [];

        tools.push(<PageEditFrame
            key={"EditFrame"}
            title={this.componentDescribe.displayName}
            componentObject={this.componentObject}
            pageComponent={this.props.pageComponent}
            editComponent={(pageComponent)=>this.props.editComponent(new EditComponentAction(this.props.pageId, this.props.sign, pageComponent))}
            show={this.state.openEdit}
            close={() => { this.setState({ openEdit: false }) }}
        ></PageEditFrame>);

        tools.push(<ToolBtns 
            key={"EditFrameBtn"}
            sign={this.props.sign}
            displayName={this.componentDescribe.displayName}
            isActivePageComponent={this.props.isActivePageComponent}
            isExistDefaultComponentData={this.componentDescribe.isExistDefaultComponentData()}
            isExistChildComponent={this.componentDescribe.isExistChildComponent()}
            removeComponentClick={() => { this.props.removeComponent(new RemoveComponentAction(this.props.pageId, this.props.sign)) }}
            editComponentClick={() => { this.setState({ openEdit: true }) }}
            addComponentClick={() => { this.props.addChildComponent(this.props.sign) }}
            editDefaultDataClick={() => { this.setState({ showPostEdit: true }) }}
        />)

        // 如果组件不是内容组件
        if (!this.componentDescribe.isExistDefaultComponentData()) {
            return tools;
        }

        tools.push(
            <PostEditFrame
                key={"PostEditFrame"}
                title={this.componentDescribe.displayName}
                show={this.state.showPostEdit}
                close={() => { this.setState({ showPostEdit: false }) }}
                submit={(data)=>this.props.defaultComponentDataUpdate(new DefaultComponentDataUpdateAction(this.props.pageId, this.props.sign, data))}
                componentData={this.getContentComponentData()}
                pageComponent={this.props.pageComponent}
                componentObject={this.componentObject}
            ></PostEditFrame>);

        return tools;
    }

    execLogic(requestData) {
        throw new Error("不能在编辑页面时执行逻辑");
    }

    propsEX() {
        return {
            onClick: (e) => {
                this.props.setActiveComponent(this.props.pageComponent.sign);
                e.stopPropagation();
                return false;
            }
        }
    }

    styleEX() {
        if (!this.props.isActivePageComponent) {
            return {};
        }

        return {
            // background: "#1b94f9",
            // boxShadow: "0px 0px 3px #00ffb3",
            backgroundColor: "#1890ff20",
        }
    }

    getClassName() {
        return `${super.getClassName()} editableparentcom`;
    }
}

PageEditCompontContainer.propTypes = {
    // 如下3个属性为父组件传入
    pageId: PropTypes.number.isRequired,
    sign: PropTypes.string.isRequired,
    addChildComponent: PropTypes.func.isRequired,

    // state
    pageComponent: PropTypes.object.isRequired,
    defaultComponentData: PropTypes.object,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    // 是否是活跃的组件（鼠标是否压在组件上）
    isActivePageComponent: PropTypes.bool.isRequired,

    // dispatch
    removeComponent: PropTypes.func.isRequired,
    editComponent: PropTypes.func.isRequired,
    defaultComponentDataUpdate: PropTypes.func.isRequired,
    pageFreshen: PropTypes.func.isRequired,
    setActiveComponent: PropTypes.func.isRequired,
}

PageEditCompontContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.sign];
    let defaultComponentData = state.defaultComponentDatas[ownProps.pageId][ownProps.sign];
    let isActivePageComponent = ownProps.sign == state.activePageComponentSign;

    return {
        pageComponent: pageComponent,
        defaultComponentData: defaultComponentData,
        page: state.page,
        pageData: state.pageData,
        isActivePageComponent: isActivePageComponent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeComponent: (removeComponentAction) => {
            dispatch(removeComponentAction);
        },
        editComponent: (editComponentAction) => {
            dispatch(editComponentAction);
        },
        defaultComponentDataUpdate: (defaultComponentDataUpdateAction) => {
            dispatch(defaultComponentDataUpdateAction);
        },
        pageFreshen: (pageName, pageDataName) => {
            let promises = [dispatch(pageFetch(pageName))];
            if (pageDataName && pageDataName != "") {
                promises.push(dispatch(pageDataFetch(pageName, pageDataName)));
            }
            return Promise.all(promises);
        },
        setActiveComponent: (componentSign) => {
            dispatch(setActiveComponent(componentSign));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageEditCompontContainer)

export default Contain;