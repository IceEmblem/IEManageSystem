import React from 'react'
import PropTypes from 'prop-types'
import { BaseContentLeafComponent } from '../BaseContentLeafComponent'

import './index.css'

class IEThumbUp extends BaseContentLeafComponent {
    getComponentData() {
        return this.props.componentData || {};
    }

    render() {
        return (
            <div className="d-flex justify-content-center iethumbup">
                <div>
                    <button className="btn btn-outline-secondary"
                        onClick={() => {
                            this.props.execLogic("1").then(()=>{
                                this.props.pageFreshen();
                            });
                        }}
                    >
                        <span className="oi oi-thumb-up"></span>
                    </button>
                    <span>{this.getComponentData().field1 || 0}</span>
                </div>
                <div>
                    <button className="btn btn-outline-secondary"
                        onClick={() => {
                            this.props.execLogic("2").then(()=>{
                                this.props.pageFreshen();
                            });
                        }}
                    >
                        <span className="oi oi-thumb-down"></span>
                    </button>
                    <span>{this.getComponentData().field2 || 0}</span>
                </div>
            </div>
        );
    }
}

IEThumbUp.defaultProps = {
};

export default IEThumbUp;