import React from 'react';
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import './index.css'

// props.show bool
// props.delay int
export default class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animate
        start={() => ({
          right: -26,
        })}

        update={() => ({
          right: [this.props.show ? 1 : -26],
          timing: { delay: this.props.delay || 0 , duration: 1000, ease: easeExpOut },
        })}
      >
        {(state) => {
          const { right } = state;

          return (
            <div className="messagebox" style={{right: `${right}rem`}}>
              {this.props.children}
            </div>
          )
        }}
      </Animate>
    )
  }
}