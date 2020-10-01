import React from 'react'
import PropTypes from 'prop-types'
import ComponentContainerBox from '../ComponentContainerBoxs'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ComponentContext from '../ComponentContext'

class RootComponentContainerBox extends React.Component {
    render() {
        if (!this.props.rootPageComponent) {
            return <></>
        }

        return (
            <ComponentContext.Provider
                value={{
                    // 可交互配置特征
                    interactivConfigFeature: undefined,
                    // 页面配置特征
                    pageConfigFeature: undefined,
                }}
            >
                {
                    this.props.rootPageComponent.pageComponentSigns.map(sign => (
                        <ComponentContainerBox
                            key={sign + this.props.currentPageAndPost.os}
                            sign={sign}
                            currentPageAndPost={this.props.currentPageAndPost}
                        >
                        </ComponentContainerBox>
                    ))
                }
            </ComponentContext.Provider>
        );
    }
}

RootComponentContainerBox.propTypes = {
    currentPageAndPost: PropTypes.object.isRequired,

    rootPageComponent: PropTypes.object.isRequired,
}


const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.currentPageAndPost.pageName;
    let os = ownProps.currentPageAndPost.os;

    return {
        pageName: pageName,
        rootPageComponent: state.pageComponents[pageName] && state.pageComponents[pageName][os][PageComponentModel.RootComponentSign],
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