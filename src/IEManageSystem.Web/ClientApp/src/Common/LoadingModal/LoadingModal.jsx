import React from 'react';
import Modal from 'Message'

import './LoadingModal.css';

// props.show bool
export default class LoadingModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Modal
      show={this.props.show}
      delay={this.props.show == false  ? 1000 : 0}
    >
      <div className="bg-success text-white loading shadow">
        <div className="loading-animation">
          <span className="oi oi-aperture" title="icon name" aria-hidden="true"></span>
        </div>
        <div className="loading-text">
          玩命加载中...
          </div>
      </div>
    </Modal>);
  }
}