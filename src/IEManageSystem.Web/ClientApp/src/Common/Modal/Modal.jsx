import React from 'react';
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import './index.css';

// props.show bool
export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animate
        start={() => ({
          x: 0,
        })}

        update={() => ({
          x: [this.props.show ? 1 : 0],
          timing: { duration: 750, ease: easeExpOut },
        })}
      >
        {(state) => {
          const { x } = state;

          return (
            <div className="iemodel" style={{opacity: `${x}`, display:x!=0?"block":"none", overflow:"scroll", marginRight:"-1.5rem"}}>
              {this.props.children}
            </div>
          )
        }}
      </Animate>
    )
  }
}