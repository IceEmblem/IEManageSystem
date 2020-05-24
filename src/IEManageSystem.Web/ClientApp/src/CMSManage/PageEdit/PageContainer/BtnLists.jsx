import React from 'react';
import ListBtn from 'ListBtn'
import PropTypes from 'prop-types'

import { Animate } from 'react-move'
import { easeExpOut, easeQuadInOut, easeCubic, easeCubicInOut } from 'd3-ease'

import { Button } from 'antd';
import { PlusCircleOutlined, InfoCircleOutlined, SyncOutlined, SaveOutlined } from "@ant-design/icons"

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
                <div className="PageContainer-btnlists-bnts d-flex">
                    <div className="PageContainer-btnlists-block2 pl-2 rounded-left"></div>
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
                                    <Button
                                        icon={<PlusCircleOutlined />}
                                        className="bg-success border-success text-white"
                                        onClick={() => {
                                            this.setState({});
                                            this.props.addComponent();
                                        }}
                                    >添加组件</Button>
                                    <div style={{ width: `${y}rem` }}></div>
                                    <Button
                                        icon={<InfoCircleOutlined />}
                                        className="bg-info border-info text-white"
                                        onClick={() => {
                                            this.setState({ showPageInfoComponent: !this.state.showPageInfoComponent });
                                        }}
                                    >页面信息</Button>
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
                                    <Button
                                        icon={<SyncOutlined />}
                                        className="bg-warning border-warning text-white"
                                        onClick={() => {
                                            this.setState({});
                                            this.props.exportPage();
                                        }}
                                    >导出页面</Button>
                                    <div style={{ width: `${y}rem` }}></div>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={() => {
                                            this.setState({});
                                            this.props.submitPage();
                                        }}
                                    >提交页面</Button>
                                    <div style={{ width: `${y}rem` }}></div>
                                </div>
                            )
                        }}
                    </Animate>
                    <div className="PageContainer-btnlists-block1 pr-2 rounded-right"></div>
                </div>
            </div>
        );
    }
}

BtnLists.propTypes = {
    addComponent: PropTypes.func.isRequired,
    submitPage: PropTypes.func.isRequired,
    pageInfoComponent: PropTypes.object.isRequired,
    exportPage: PropTypes.func.isRequired
}