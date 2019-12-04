import React from 'react';
import PropTypes from 'prop-types'
import ErrorModal from 'ErrorModal/ErrorModal.jsx';

import {clearError} from 'Core/IEReduxs/Actions'

import { connect } from 'react-redux'

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
        // if(this.state.show == true){
        //     setTimeout(
        //         ()=>this.setState({
        //             show: false
        //         }), 2000
        //     )
        // }
            
        return (
            <ErrorModal
                show={this.state.show}
                title="发生了一个错误"
                message={this.state.message}
                close={this.props.close}
            />)
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

const ErrorContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(Error)

export default ErrorContain