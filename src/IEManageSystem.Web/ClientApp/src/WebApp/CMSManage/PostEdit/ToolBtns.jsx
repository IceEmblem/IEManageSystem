import React from 'react';
import PropTypes from 'prop-types'
import { ComponentDataUpdateAction } from 'BaseCMSManage/IEReduxs/Actions'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PostEditFrame from 'CMSManage/Component/ComponentContainerBoxs/PostEditFrame'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import ComponentDataModel from 'BaseCMSManage/Models/ComponentDataModel'

import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './ToolBtns.css'

class ToolBtns extends React.Component {
    state = {
        show: false,
    }

    constructor(props) {
        super(props);
        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
    }

    render() {
        
        if(!this.componentDescribe.isExistComponentData()){
            return <div></div>;
        }

        return (
            <div className="parentcomponent-btns"
                key={"editFrameBtn"}
            >
                <Tooltip title="编辑数据">
                    <Button type="primary" shape="circle" icon={<EditOutlined />}
                        onClick={() => { this.setState({ show: true }) }}
                    />
                </Tooltip>
                <PostEditFrame
                    key={"editFrame"}
                    title={this.componentDescribe.displayName}
                    show={this.state.show}
                    close={() => { this.setState({ show: false }) }}
                    submit={(data) => this.props.componentDataUpdate(new ComponentDataUpdateAction(this.props.pageDataId, data))}
                    componentData={this.componentDescribe.isExistComponentData() && (this.props.contentComponentData || this.props.defaultComponentData || ComponentDataModel.CreateDefaultComponentData(this.props.sign))}
                    pageComponent={this.props.pageComponent}
                    componentDescribe={this.componentDescribe}
                ></PostEditFrame>
            </div>
        )
    }
}

ToolBtns.propTypes = {
    // 如下 3 个属性由父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number.isRequired,
    sign: PropTypes.string.isRequired,

    // redux state
    pageComponent: PropTypes.object.isRequired,
    defaultComponentData: PropTypes.object,
    contentComponentData: PropTypes.object,

    // redux 
    componentDataUpdate: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let defaultComponentData = state.defaultComponentDatas[ownProps.pageId][ownProps.sign];
    let contentComponentData = undefined;
    if (state.contentComponentDatas[ownProps.pageDataId]) {
        contentComponentData = state.contentComponentDatas[ownProps.pageDataId][ownProps.sign];
    }

    return {
        defaultComponentData: defaultComponentData,
        contentComponentData: contentComponentData,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        componentDataUpdate: (componentDataUpdateAction) => {
            dispatch(componentDataUpdateAction);
        },
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ToolBtns)

export default Contain;