import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { setActiveComponent, RootComponentSign } from 'BaseCMSManage/IEReduxs/Actions'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import { Button, Popover, Input, Tag, Select, Tooltip } from 'antd'
import { BranchesOutlined, ArrowUpOutlined, EditOutlined } from "@ant-design/icons"

class ToolBtns extends React.Component {
    state = {
        openEdit: false,
        showPostEdit: false,
        show: false
    }

    componentDescribe = undefined;

    constructor(props) {
        super(props);

        if (this.props.pageComponent) {
            this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
        }
    }

    getBtns() {
        return <>
            {
                this.componentDescribe.componentObject.BasicComponentSettingConfig.bulidConfigBtnComponent(
                    this.props.pageId,
                    this.props.pageDataId,
                    this.props.os,
                    this.props.sign,
                )
            }
            {
                this.componentDescribe.componentObject.ComponentDataConfig &&
                this.componentDescribe.componentObject.ComponentDataConfig.bulidConfigBtnComponent(
                    this.props.pageId,
                    this.props.pageDataId,
                    this.props.os,
                    this.props.sign,
                )
            }
            {
                this.componentDescribe.componentObject.ComponentSettingConfigs.map(item =>
                    item.bulidConfigBtnComponent(
                        this.props.pageId,
                        this.props.pageDataId,
                        this.props.os,
                        this.props.sign,
                    )
                )
            }
            {
                this.componentDescribe.componentObject.DeleteConfig.bulidConfigBtnComponent(
                    this.props.pageId,
                    this.props.pageDataId,
                    this.props.os,
                    this.props.sign,
                )
            }
        </>
    }

    render() {
        if (!this.props.pageComponent) {
            return <></>;
        }

        let domNode = document.getElementById("PageEditPortals");

        return (
            <>
                <div className={`pageedit-componentcontainer-btns pageedit-componentcontainer-btns-transform`} style={this.props.style}>
                    <Popover
                        placement={this.props.placement}
                        visible={this.state.show}
                        onVisibleChange={(visible) => {
                            this.setState({ show: visible })
                        }}
                        content={this.getBtns()}
                        title={`编辑 ${this.componentDescribe.displayName}`}
                        trigger="click"
                    >
                        <Button
                            type='primary'
                            icon={<BranchesOutlined />}
                        ></Button>
                    </Popover>
                </div>
                {
                    this.props.cancelActiveShow != true && this.props.isActive &&
                    ReactDOM.createPortal(
                        <div style={{
                            position: 'fixed',
                            display: 'flex',
                            right: 80,
                            bottom: 110,
                            alignItems: 'center',
                            borderRadius: 20
                        }}>
                            <Tag className='mr-3' icon={<EditOutlined />} color="#55acee">
                                {this.componentDescribe.displayName}
                            </Tag>
                            {
                                this.getBtns()
                            }
                            <Button
                                className='ml-3'
                                size='small'
                                shape='circle'
                                icon={<ArrowUpOutlined />}
                                onClick={(e) => {
                                    // 停止冒泡是必须的，不然会触发组件的点击事件，当前组件又会变为活跃组件
                                    e.stopPropagation();
                                    e.cancelable = true;

                                    if (RootComponentSign == this.props.pageComponent.parentSign) {
                                        return false;
                                    }

                                    this.props.setActiveComponent(this.props.pageComponent.parentSign);

                                    return false
                                }}
                            ></Button>
                        </div>,
                        domNode,
                    )
                }
            </>)
    }
}

ToolBtns.propTypes = {
    // 如下属性由父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    os: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    style: PropTypes.object,
    placement: PropTypes.string,
    cancelActiveShow: PropTypes.bool,   // 取消活跃显示（默认情况下，如果组件被选择，会显示组件编辑按钮列表，如果想点击的时候再显示，则设为true）

    // redux state
    pageComponent: PropTypes.object.isRequired,
    isActive: PropTypes.string,
    setActiveComponent: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.os][ownProps.sign];
    return {
        isActive: state.activePageComponentSign == pageComponent.sign,
        pageComponent: pageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setActiveComponent: (sign) => {
            return dispatch(setActiveComponent(sign));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ToolBtns)

export default Contain;