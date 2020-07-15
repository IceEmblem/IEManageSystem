import React from 'react';
import PropTypes from 'prop-types'

import { Spin, Button } from 'antd';

import RootRedux from 'Core/IEReduxs/RootRedux'

class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div
            className="flex-column justify-content-center align-items-center"
            style={{ display: this.props.show ? "flex" : "none", position: "fixed", width: "100%", height: "100%", left: "0px", top: "0px" }}
        >
            <Spin
                tip="load..."
                size="large"
                spinning={this.props.show}
            />
        </div>
    }
}

Loading.propTypes = {
    show: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        show: state.fecths.filter(item => item.isFecthing).length > 0,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const LoadingContain = RootRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps, // 关于dispatch
)(Loading)

export default LoadingContain