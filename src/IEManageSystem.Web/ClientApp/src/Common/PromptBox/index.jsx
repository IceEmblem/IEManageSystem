import React from 'react'

import './index.css'

export default class PromptBox extends React.Component {
    render(){
        return (
            <div className="promptbox d-flex flex-column align-items-center">
                <div className="card">
                    <div className="card-body">
                        {this.props.children}
                    </div>
                </div>
                <div className="promptbox-triangle-bottom"></div>
            </div>
        )
    }
}