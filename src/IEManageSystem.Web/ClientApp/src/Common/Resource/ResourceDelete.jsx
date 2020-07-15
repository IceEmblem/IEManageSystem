import React from 'react';

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default class ResourceDelete extends React.Component {
  // props.title
  // props.resource
  // props.nameDescribe
  // props.resourceUpdate()
  // props.show
  // props.close()
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.close();
    this.props.resourceUpdate(this.props.resource);
  }

  render() {
    return (<Modal
      title={
        <div className="d-flex align-items-center">
          <ExclamationCircleOutlined className="mr-3" style={{ fontSize: "22px", color: "#faad14" }} />
          <span>{this.props.title}</span>
        </div>}
      visible={this.props.show}
      onOk={this.delete}
      onCancel={this.props.close}
      okText="确认"
      cancelText="取消"
    >
      <p>你正要删除 {this.props.resource[this.props.nameDescribe.name]} ，确定删除吗？</p>
    </Modal>)
  }
}