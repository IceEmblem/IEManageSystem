import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import { pageFetch, pageDataFetch } from 'CMSManage/IEReduxs/Actions'
import { ieReduxFetch } from 'Core/IEReduxFetch'

import BaseComponentContainer from '../BaseComponentContainer.jsx'

class FrontCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);
    }

    createChildComponent() {
        return this.props.pageComponent.pageComponentSigns.map(sign => (
            <Contain
                key={sign}
                sign={sign}
                pageId={this.props.pageId}
                pageDataId={this.props.pageDataId}
            >
            </Contain>)
        );
    }

    execLogic(requestData) {

        let postData = {
            logicName: this.props.pageComponent.name,
            pageName: this.props.page.name,
            pageComponentSign: this.props.pageComponent.sign,
            pageDataName: this.props.pageData.name,
            // 有些组件没有组件数据
            contentComponentDataSign: this.props.contentComponentData ? this.props.contentComponentData.sign : "",
            request: requestData
        };

        return ieReduxFetch("/api/LogicExec/ExecLogic", postData);
    }
}

FrontCompontContainer.propTypes = {
    // 如下 3 个属性由父组件传入
    sign: PropTypes.string.isRequired,
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number.isRequired,

    pageComponent: PropTypes.object.isRequired,
    defaultComponentData: PropTypes.object,
    contentComponentData: PropTypes.object,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

FrontCompontContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.sign];
    let defaultComponentData = state.defaultComponentDatas[ownProps.pageId][ownProps.sign];
    let contentComponentData = undefined;

    if(ownProps.pageDataId){
        contentComponentData = state.contentComponentDatas[ownProps.pageDataId][ownProps.sign]
    }

    return {
        pageComponent: pageComponent,
        defaultComponentData: defaultComponentData,
        contentComponentData: contentComponentData,
        page: state.pages[ownProps.pageId],
        pageData: state.pageDatas[ownProps.pageDataId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFreshen: (pageName, pageDataName) => {
            let promises = [dispatch(pageFetch(pageName))];
            if (pageDataName && pageDataName != "") {
                promises.push(dispatch(pageDataFetch(pageName, pageDataName)));
            }
            return Promise.all(promises);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(FrontCompontContainer)

export default Contain;