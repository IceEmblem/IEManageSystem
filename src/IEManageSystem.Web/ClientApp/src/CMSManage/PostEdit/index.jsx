import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import './index.css'

import { pageFetch, pageDataFetch, componentDataUpdateFetch } from 'CMSManage/IEReduxs/Actions'
import PostEditComponentContainer from 'CMSManage/Component/ComponentContainers/PostEditComponentContainer'

import { Button } from 'antd';
import { CloudUploadOutlined, UndoOutlined } from '@ant-design/icons'

import Page from 'CMSManage/Home/Page'

class ComponentData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false
        };

        Promise.all([
            this.props.pageFetch(this.props.pageName),
            this.props.pageDataFetch(this.props.pageName, this.props.pageDataName)
        ]).then(() => {
            this.setState({ isLoad: true });
        });
    }

    render() {
        if (this.state.isLoad == false) {
            return (<div className="postedit-page-container"></div>);
        }

        return (
            <div className="postedit-page-container">
                <div className="postedit-page-container-header">
                    <Button
                        className="mr-2"
                        icon={<UndoOutlined />}
                        onClick={() => this.props.pageDataFetch(this.props.pageName, this.props.pageDataName)}
                    >
                        取消修改
                    </Button>
                    <Button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        onClick={() => this.props.componentDataUpdateFetch(this.props.pageName, this.props.pageDataName, this.props.contentComponentDatas)}
                    >
                        提交文章
                    </Button>
                </div>
                <div>
                    <Page>
                        {
                            this.props.page.pageComponents.filter(item => !item.parentSign).map(item =>
                                <PostEditComponentContainer
                                    key={item.sign}
                                    pageComponent={item}
                                >
                                </PostEditComponentContainer>)
                        }
                    </Page>
                </div>
            </div>
        );
    }
}

ComponentData.propTypes = {
    page: PropTypes.object,
    pageData: PropTypes.object,
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string,
    pageFetch: PropTypes.func.isRequired,
    pageDataFetch: PropTypes.func.isRequired,
    componentDataUpdateFetch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.page,
        pageData: state.pageData,
        contentComponentDatas: state.contentComponentDatas,
        pageName: ownProps.match.params.pageName,
        pageDataName: ownProps.match.params.pageDataName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageFetch: (name) => {
            return dispatch(pageFetch(name));
        },
        pageDataFetch: (pageName, pageDataName) => {
            return dispatch(pageDataFetch(pageName, pageDataName));
        },
        componentDataUpdateFetch: (pageName, pageDataName, componentDatas) => {
            return dispatch(componentDataUpdateFetch(pageName, pageDataName, componentDatas));
        }
    }
}

const ComponentDataContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentData)

export default ComponentDataContain;