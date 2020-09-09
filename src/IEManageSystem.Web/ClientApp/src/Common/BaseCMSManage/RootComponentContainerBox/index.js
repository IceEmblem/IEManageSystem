import React from 'react'
import PropTypes from 'prop-types'
import ComponentContainerBox from '../ComponentContainerBoxs'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import {
    RootComponentSign,
} from 'BaseCMSManage/IEReduxs/Actions'
import ComponentContext from '../ComponentContext'

class RootComponentContainerBox extends React.Component {
    render() {
        return (
            <ComponentContext.Provider value={{}}>
                {
                    this.props.rootPageComponent.pageComponentSigns.map(sign => (
                        <>
                            <ComponentContainerBox
                                key={sign + this.props.rootPageComponent.os}
                                sign={sign}
                                pageId={this.props.pageId}
                                pageDataId={this.props.pageDataId}
                                os={this.props.os}
                            >
                            </ComponentContainerBox>
                        </>
                    ))
                }
            </ComponentContext.Provider>
        );
    }
}

RootComponentContainerBox.propTypes = {
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    os: PropTypes.string.isRequired,

    rootPageComponent: PropTypes.object.isRequired,
}


const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        rootPageComponent: state.pageComponents[ownProps.pageId][ownProps.os][RootComponentSign],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(RootComponentContainerBox)

export default Contain;