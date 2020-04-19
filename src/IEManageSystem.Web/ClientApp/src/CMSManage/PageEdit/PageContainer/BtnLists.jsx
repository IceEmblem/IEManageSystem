import React from 'react';
import ListBtn from 'ListBtn'
import PropTypes from 'prop-types'

import { Animate } from 'react-move'
import { easeExpOut, easeQuadInOut, easeCubic, easeCubicInOut } from 'd3-ease'

import "./BtnLists.css";

export default class BtnLists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            showPageInfoComponent: false
        }
    }

    render() {
        return (
            <div className="PageContainer-btnlists">
                <div className="PageContainer-btnlists-pageInfoComponent">
                    {this.state.showPageInfoComponent && this.props.pageInfoComponent}
                </div>
                <div className="PageContainer-btnlists-bnts d-flex justify-content-center">
                    <div className="PageContainer-btnlists-block2"></div>
                    <Animate
                        start={() => ({
                            x: this.state.open ? 100 : 0,
                            y: 0
                        })}

                        update={[
                            {
                                x: [this.state.open ? 100 : 0],
                                y: [this.state.open ? 0.5 : 0],
                                timing: { duration: 500, ease: easeCubicInOut },
                            },
                            {
                                y: 0,
                                timing: { delay: 500, duration: 200, ease: easeCubicInOut },
                            },
                        ]}
                    >
                        {(state) => {
                            const { x, y } = state
                            return (
                                <div className="d-flex justify-content-end overflow-hidden-x" style={{ width: `${x}%` }}>
                                    <div style={{ width: `${y}rem` }}></div>
                                    <button className="btn btn-success padding-left-10 padding-right-10 shadow-sm"
                                        onClick={()=>{
                                            this.setState({});
                                            this.props.addComponent();
                                        }}
                                    >
                                        <span className="oi oi-plus" title="添加组件" aria-hidden="true"></span>
                                        {" 添加组件"}
                                    </button>
                                    <div style={{ width: `${y}rem` }}></div>
                                    <button className="btn btn-primary padding-left-10 padding-right-10 shadow-sm"
                                        onClick={()=>{
                                            this.setState({showPageInfoComponent: !this.state.showPageInfoComponent});
                                        }}
                                    >
                                        <span className="oi oi-info" title="页面信息" aria-hidden="true"></span>
                                        {" 页面信息"}
                                    </button>
                                    <div style={{ width: `${y}rem` }}></div>
                                </div>
                            )
                        }}
                    </Animate>
                    <div className="d-flex align-items-center">
                        <ListBtn
                            open={this.state.open}
                            className=""
                            onClick={() => { this.setState({ open: !this.state.open }) }}
                        />
                    </div>
                    <Animate
                        start={() => ({
                            x: this.state.open ? 100 : 0,
                            y: 0
                        })}

                        update={[
                            {
                                x: [this.state.open ? 100 : 0],
                                y: [this.state.open ? 0.5 : 0],
                                timing: { duration: 500, ease: easeCubicInOut },
                            },
                            {
                                y: 0,
                                timing: { delay: 500, duration: 200, ease: easeCubicInOut },
                            },
                        ]}
                    >
                        {(state) => {
                            const { x, y } = state
                            return (
                                <div className="d-flex overflow-hidden-x" style={{ width: `${x}%` }}>
                                    <div style={{ width: `${y}rem` }}></div>
                                    <button className="btn btn-warning padding-left-10 padding-right-10 shadow-sm"
                                        onClick={()=>{
                                            this.setState({});
                                            this.props.pageUpdate();
                                        }}
                                    >
                                        <span className="oi oi-loop-circular mr-1" title="icon name" aria-hidden="true"></span>
                                重新渲染
                                </button>
                                    <div style={{ width: `${y}rem` }}></div>
                                    <button className="btn btn-info padding-left-10 padding-right-10 shadow-sm"
                                        onClick={()=>{
                                            this.setState({});
                                            this.props.submitPage();
                                        }}
                                    >
                                        <span className="oi oi-cloud-upload mr-1" title="icon name" aria-hidden="true"></span>
                                提交页面
                                </button>
                                    <div style={{ width: `${y}rem` }}></div>
                                </div>
                            )
                        }}
                    </Animate>
                    <div className="PageContainer-btnlists-block1"></div>
                </div>
            </div>
        );
    }
}

BtnLists.propTypes = {
    addComponent: PropTypes.func.isRequired,
    submitPage: PropTypes.func.isRequired,
    pageInfoComponent: PropTypes.object.isRequired,
    pageUpdate: PropTypes.func.isRequired
}