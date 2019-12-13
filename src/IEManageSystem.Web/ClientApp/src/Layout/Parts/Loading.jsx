import React from 'react';
import PropTypes from 'prop-types'
import LoadingModal from 'LoadingModal/LoadingModal.jsx';

import RootRedux from 'Core/IEReduxs/RootRedux'

class Loading extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (<LoadingModal show={this.props.show} />)
    }
}

Loading.propTypes = {
    show: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        show: state.fecth.isFecth,
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