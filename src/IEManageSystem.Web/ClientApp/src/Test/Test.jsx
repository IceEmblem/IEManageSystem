import React from 'react';

import Modal from 'Modal/Modal';

import "./Test.css";

export default class Test extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <Modal show={true}>
                    <div className="d-flex justify-content-center  align-items-center w-100 h-100">
                        <div className="card w-75">
                            <div className="card-body">
                                <div>
                                    <div className="components-title">
                                        容器组件
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            列表
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}