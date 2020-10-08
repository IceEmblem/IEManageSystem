import React from 'react'
import PropTypes from 'prop-types'
import ComponentContainerBox from '../ComponentContainerBoxs'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'
import ComponentContext from '../ComponentContext'
import PageDataModel from 'BaseCMSManage/Models/PageDatas/PageDataModel'

const pageDataModel = PageDataModel.CreatePageDataModel();

class RootComponentContainerBox extends React.Component {
    getCurrentPageAndPost = () => {
        return {
            os: this.props.os,
            page: this.props.page,
            pageData: this.props.pageData || pageDataModel,
            isExistPageData: !!this.props.pageDataId,
            pageComponents: this.props.pageComponents,
            defaultComponentDatas: this.props.defaultComponentDatas,
            contentComponentDatas: this.props.contentComponentDatas || [],
        };
    }

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
                            key={sign + this.props.rootPageComponent.os}
                            sign={sign}
                            currentPageAndPost={this.getCurrentPageAndPost()}
                        >
                        </ComponentContainerBox>
                    ))
                }
            </ComponentContext.Provider>
        );
    }
}

RootComponentContainerBox.propTypes = {
    rootPageComponent: PropTypes.object.isRequired,
}


const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageName = ownProps.pageName;
    let pageDataId = ownProps.pageDataId;
    let os = ownProps.os;

    return {
        rootPageComponent: state.pageComponents[pageName] && state.pageComponents[pageName][os][PageComponentModel.RootComponentSign],
        page: state.pages[pageName],
        pageData: state.pageDatas[pageDataId],
        pageComponents: state.pageComponents[pageName] && state.pageComponents[pageName][os],
        defaultComponentDatas: state.defaultComponentDatas[pageName],
        contentComponentDatas: state.contentComponentDatas[pageDataId],
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