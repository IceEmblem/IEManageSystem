import React from 'react';
import Modal from 'Modal/Modal.jsx'

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
    return (
      <Modal
        show={this.props.show}
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header bg-info text-white">
              <h4 className="modal-title">删除 {this.props.title}</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>&times;</button>
            </div>

            <div className="modal-body">
              你正要删除 {this.props.resource[this.props.nameDescribe.name]} ，确定删除吗？
                  </div>

            <div className="modal-footer">
              <span id="dataDeleteError" className="text-danger"></span>
              <button type="button" className="btn btn-danger btn-sm" onClick={this.delete}>删除</button>
              <button id="dataDeleteCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.close}>关闭</button>
            </div>

          </div>
        </div>
      </Modal>
    );
  }
}