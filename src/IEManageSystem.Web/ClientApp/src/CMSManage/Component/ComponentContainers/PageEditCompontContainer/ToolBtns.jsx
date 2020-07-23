import React from 'react';
import PropTypes from 'prop-types'

import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, AppstoreAddOutlined, FormOutlined } from '@ant-design/icons';

export default class ToolBtns extends React.Component {
    render() {
        let editFrameBtnStyle = {};

        if (this.props.isActivePageComponent) {
            editFrameBtnStyle.opacity = 1;
            editFrameBtnStyle.zIndex = 9999;
        }

        return (<div className="editableparentcom-btns"
            style={editFrameBtnStyle}
        >
            <Tooltip title={`删除 ${this.props.displayName}，组件标识：${this.props.sign}`} overlayStyle={{ zIndex: 10000 }}>
                <Button type="primary" shape="round" danger icon={<DeleteOutlined />}
                    onClick={this.props.removeComponentClick}
                />
            </Tooltip>
            <Tooltip title={`编辑 ${this.props.displayName}，组件标识：${this.props.sign}`} overlayStyle={{ zIndex: 10000 }}>
                <Button type="primary" shape="round" icon={<EditOutlined />}
                    onClick={this.props.editComponentClick}
                />
            </Tooltip>
            {
                this.props.isExistChildComponent &&
                <Tooltip title={`添加，组件标识：${this.props.sign}`} overlayStyle={{ zIndex: 10000 }}>
                    <Button type="default" shape="round" icon={<AppstoreAddOutlined />}
                        onClick={this.props.addComponentClick}
                    />
                </Tooltip>
            }
            {
                this.props.isExistDefaultComponentData &&
                <Tooltip title={`编辑默认数据，组件标识：${this.props.sign}`} overlayStyle={{ zIndex: 10000 }}>
                    <Button type="primary" shape="round" icon={<FormOutlined />}
                        onClick={this.props.editDefaultDataClick}
                    />
                </Tooltip>
            }
        </div>)
    }
}

ToolBtns.propTypes = {
    sign: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    isActivePageComponent: PropTypes.bool.isRequired,
    isExistDefaultComponentData: PropTypes.bool.isRequired,
    isExistChildComponent: PropTypes.bool.isRequired,
    removeComponentClick: PropTypes.func.isRequired,
    editComponentClick: PropTypes.func.isRequired,
    addComponentClick: PropTypes.func.isRequired,
    editDefaultDataClick: PropTypes.func.isRequired,
}