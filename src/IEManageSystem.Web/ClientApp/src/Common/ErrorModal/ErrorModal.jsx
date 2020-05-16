import React from 'react';
import Modal from 'Message'

import './ErrorModal.css'

export default class ErrorModal extends React.Component {
  // props.show bool
  // props.title
  // props.message
  // props.close    fun
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.show == true) {
      setTimeout(() => this.props.close(), 5000)
    }

    return (<Modal
      show={this.props.show}
    >
      <div className="card text-white errormodal">
        <div className="card-header">
          <h5 className="modal-title">
            {this.props.title}
            <button type="button" className="close text-white" onClick={
              () => this.props.close()
            }>&times;</button>
          </h5>
        </div>
        <div className="card-body">
          {this.props.message}
        </div>
      </div>
    </Modal>);
  }
}