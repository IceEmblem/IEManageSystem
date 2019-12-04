import React from 'react';
import Modal from 'Modal/Modal.jsx'

export default class ConfirmBox extends React.Component {
  // props.title
  // props.text
  // props.backcall() 确认按钮回调
  // props.show
  // props.close()
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        show={this.props.show}
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header bg-info text-white">
              <h4 className="modal-title">{this.props.title}</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={() => { this.props.close(); }}>&times;</button>
            </div>

            <div className="modal-body">
              {this.props.text}
            </div>

            <div className="modal-footer">
              <span id="dataDeleteError" className="text-danger"></span>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => { this.props.close(); this.props.backcall(); }}>确认</button>
              <button id="dataDeleteCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.props.close(); }}>关闭</button>
            </div>

          </div>
        </div>
      </Modal>
    );
  }
}