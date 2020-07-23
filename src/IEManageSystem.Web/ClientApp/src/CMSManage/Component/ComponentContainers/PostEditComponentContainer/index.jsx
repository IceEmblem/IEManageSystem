import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import { ComponentDataUpdateAction, pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'

import './index.css'
import BaseComponentContainer from '../BaseComponentContainer'

import PostEditFrame from '../PostEditFrame'

import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const ToolBtns = ({ editComponentDataClick }) => (
    <div className="parentcomponent-btns"
        key={"editFrameBtn"}
    >
        <Tooltip title="编辑数据">
            <Button type="primary" shape="circle" icon={<EditOutlined />}
                onClick={editComponentDataClick}
            />
        </Tooltip>
    </div>)

class PostEditComponentContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    createChildComponent() {
        return this.props.pageComponent.pageComponentSigns.map(sign => (
            <Contain
                key={sign}
                sign={sign}
                pageId={this.props.pageId}
                pageDataId={this.props.pageDataId}
            >
            </Contain>)
        );
    }

    getTools() {
        if (!this.componentDescribe.isExistDefaultComponentData()) {
            return;
        }

        let tools = [];

        tools.push(
            <PostEditFrame
                key={"editFrame"}
                title={this.componentDescribe.displayName}
                show={this.state.show}
                close={() => { this.setState({ show: false }) }}
                submit={(data) => this.props.componentDataUpdate(new ComponentDataUpdateAction(this.props.pageDataId, data))}
                componentData={this.getContentComponentData()}
                pageComponent={this.props.pageComponent}
                componentObject={this.componentObject}
            ></PostEditFrame>);

        tools.push(<ToolBtns 
            editComponentDataClick={()=>{this.setState({show: true})}}
        />);

        return tools;
    }

    execLogic(requestData) {
        throw new Error("不能在编辑文章时执行逻辑");
    }
}

PostEditComponentContainer.propTypes = {
    // 如下 3 个属性由父组件传入
    sign: PropTypes.string.isRequired,
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number.isRequired,

    pageComponent: PropTypes.object.isRequired,
    componentDataUpdate: PropTypes.func.isRequired,
    contentComponentData: PropTypes.object,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

PostEditComponentContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.sign];
    let defaultComponentData = state.defaultComponentDatas[ownProps.pageId][ownProps.sign];
    let contentComponentData = undefined;
    if(state.contentComponentDatas[ownProps.pageDataId]){
        contentComponentData = state.contentComponentDatas[ownProps.pageDataId][ownProps.sign];
    }

    return {
        pageComponent: pageComponent,
        defaultComponentData: defaultComponentData,
        contentComponentData: contentComponentData,
        page: state.pages[ownProps.pageId],
        pageData: state.pageDatas[ownProps.pageDataId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        componentDataUpdate: (componentDataUpdateAction) => {
            dispatch(componentDataUpdateAction);
        },
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
)(PostEditComponentContainer)

export default Contain;