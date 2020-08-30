import React from 'react';
import PropTypes from 'prop-types'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import { Button, Popover, Input, Tag, Select, Tooltip } from 'antd'
import { BranchesOutlined } from "@ant-design/icons"

class ToolBtns extends React.Component {
    state = {
        openEdit: false,
        showPostEdit: false
    }

    componentDescribe = undefined;

    constructor(props) {
        super(props);

        if (this.props.pageComponent) {
            this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
        }
    }

    render() {
        if (!this.props.pageComponent) {
            return <></>;
        }

        return (
            <div
                className={`pageedit-componentcontainer-btns pageedit-componentcontainer-btns-transform`}
                style={this.props.style}
            >
                <Popover
                    overlayClassName='pageedit-componentcontainer-btns-popover'
                    placement={this.props.placement}
                    content={<>
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
                    </>}
                    title={`编辑 ${this.componentDescribe.displayName}`}
                    trigger="click"
                >
                    <Button
                        type='primary'
                        icon={<BranchesOutlined />}
                    ></Button>
                </Popover>
            </div>)
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

    // redux state
    pageComponent: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        pageComponent: state.pageComponents[ownProps.pageId][ownProps.os][ownProps.sign],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ToolBtns)

export default Contain;