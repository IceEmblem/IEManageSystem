import React from 'react'
import './ComponentContainerBoxShow.css'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    errorShow() {
        return <div>
            <div>无法展示组件，请确保组件的样式和配置是否正确</div>
            <div>错误信息：{
                this.state.error && 
                this.state.error.message && 
                `${this.state.error.message.substr(0, 150)}......`
            }
            </div>
        </div>
    }

    render() {
        if (this.state.error) {
            return this.errorShow();
        }

        return (
            <div
                style={this.props.style}
                className={`cms-componentcontainerboxshow ${this.props.className}`}
                {...this.props.propsEX}
            >
                {this.props.ToolBtn}
                {this.props.children}
            </div>
        )
    }
}