import React from 'react'
import { Steps, Button } from 'antd';
import Introduce from './Introduce'
import DBConfigure from './DBConfigure'
import InitSite from './InitSite'
import {ieReduxFetch} from 'Core/IEReduxFetch'
import {withRouter} from 'react-router-dom'
const { Step } = Steps;

class Init extends React.Component {
    state = {
        stepIndex: 0,
        sqlType: undefined,
        sqlConnect: undefined,
    }

    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
    }

    init() {
        let postData = {
            sqlType: this.state.sqlType,
            connectString: this.state.sqlConnect
        }

        ieReduxFetch("/api/InitSite/Init", postData)
        .then(value=>{
            this.props.history.push("/Account");
        });
    }

    render() {
        return (
            <div className="container h-100 pt-5 pb-5">
                <div className="d-flex h-100 flex-column">
                    <Steps current={this.state.stepIndex}>
                        <Step title="IceEmblem CMS 介绍" />
                        <Step title="数据库配置" />
                        <Step title="初始化站点" />
                    </Steps>
                    <div className="mt-5">
                        {
                            this.state.stepIndex == 0 && <Introduce />
                        }
                        {
                            this.state.stepIndex == 1 &&
                            <DBConfigure
                                sqlType={this.state.sqlType}
                                sqlConnect={this.state.sqlConnect}
                                setSqlType={(value) => { this.setState({ sqlType: value }) }}
                                setSqlConnect={(value) => { this.setState({ sqlConnect: value }) }}
                            />
                        }
                        {
                            this.state.stepIndex == 2 &&
                            <InitSite />
                        }
                    </div>
                    <div className="flex-grow-1"></div>
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => this.setState({ stepIndex: this.state.stepIndex - 1 })}
                            disabled={this.state.stepIndex <= 0}>上一步</Button>
                        <Button
                            className="ml-3"
                            type='primary'
                            onClick={() => this.setState({ stepIndex: this.state.stepIndex + 1 })}
                            disabled={this.state.stepIndex >= 2}>下一步</Button>
                        {
                            this.state.stepIndex == 2 &&
                            <button
                                style={{borderRadius: "1px"}}
                                className="ml-3 btn btn-success"
                                onClick={this.init}
                            >
                                初始化
                            </button>
                        }
                    </div>
                </div>
            </div>)
    }
}

export default withRouter(Init)