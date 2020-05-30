import React from 'react';
import PropTypes from 'prop-types'

import { Button, notification, Space } from 'antd';

import {clearError} from 'Core/IEReduxs/Actions'

import RootRedux from 'Core/IEReduxs/RootRedux'

class Error extends React.Component {
    constructor(props) {
        super(props)
    }

    render() 
    {
        this.props.errorFetchDatas.forEach(element => {
            notification.error({
                message: "请求错误", 
                description: element.error,
                onClose: ()=>{}});
        });

        this.props.errorFetchDatas.forEach(element => {
            this.props.clearError(element.fecthSign)
        });
            
        return <div></div>
    }
}

Error.propTypes = {
    errorFetchDatas: PropTypes.array.isRequired,
    clearError: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let errorFetchDatas = state.fecths.filter(item=>item.isSuccess == false);
    return {
        errorFetchDatas: errorFetchDatas
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearError: (fecthSign)=>{ dispatch(clearError(fecthSign)) }
    }
}

const ErrorContain = RootRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(Error)

export default ErrorContain