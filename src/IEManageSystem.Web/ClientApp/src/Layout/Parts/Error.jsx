import React from 'react';
import PropTypes from 'prop-types'

import { Button, notification, Space } from 'antd';

import {clearError} from 'Core/IEReduxs/Actions'

import RootRedux from 'Core/IEReduxs/RootRedux'

class Error extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            message: ""
        }
    }

    componentWillUpdate(props) {
        if(props.isSuccess == false){
            this.state.show = true;
            this.state.message = props.error;
        }
        else{
            this.state.show = false;
        }
    }

    render() 
    {
        if(this.state.show){
            notification.error({
                message: "请求错误", 
                description: this.state.message,
                onClose: this.props.close});
        }
            
        return <div></div>
    }
}

Error.propTypes = {
    isSuccess: PropTypes.bool,
    error: PropTypes.string
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        isSuccess: state.fecth.isSuccess,
        error: state.fecth.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        close: ()=>{ dispatch(clearError()) }
    }
}

const ErrorContain = RootRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(Error)

export default ErrorContain