import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import {pageFetch, pageDataFetch} from 'CMSManage/IEReduxs/Actions'
import {ieReduxFetch} from 'Core/IEReduxFetch'

import BaseComponentContainer from '../BaseComponentContainer.jsx'

class FrontCompontContainer extends BaseComponentContainer {
    constructor(props) {
        super(props);
    }

    createChildComponent(){
        return this.props.childPageComponents.map(item => (
            <Contain
                key={item.sign}
                pageComponent={item}
            >
            </Contain>)
        );
    }

    execLogic(requestData){
        if(!(this.props.pageComponent && 
            this.props.pageComponent.name && 
            this.props.pageData &&
            this.props.pageData.name
        ))
        {
            throw new Error("无法执行逻辑，请确保页面或文章存在");
        }

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
    pageComponent: PropTypes.object.isRequired,
    childPageComponents: PropTypes.array.isRequired,
    contentComponentData: PropTypes.object,
    page: PropTypes.object.isRequired,
    pageData: PropTypes.object.isRequired,
    pageFreshen: PropTypes.func.isRequired
}

FrontCompontContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    // 新增属性 parentSign
    let childPageComponents = ownProps.pageComponent.pageComponents;
    let contentComponentData = state.contentComponentDatas.find(e=>e.sign == ownProps.pageComponent.sign);
    let defaultComponentData = state.defaultComponentDatas.find(item => item.sign == ownProps.pageComponent.sign);

    return {
        defaultComponentData: defaultComponentData,
        childPageComponents: childPageComponents,
        contentComponentData: contentComponentData,
        page: state.page,
        pageData: state.pageData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFreshen: (pageName, pageDataName) => {
            return Promise.all([dispatch(pageFetch(pageName)), dispatch(pageDataFetch(pageName, pageDataName))]);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(FrontCompontContainer)

export default Contain;