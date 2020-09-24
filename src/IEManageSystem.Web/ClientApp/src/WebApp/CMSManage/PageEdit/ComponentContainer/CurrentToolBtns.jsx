import React from 'react'
import PropTypes from 'prop-types'
import SignSquareFrame from './SignSquareFrame'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'
import { setActiveComponent } from 'BaseCMSManage/IEReduxs/Actions'

import { Button } from 'antd'
import { ShareAltOutlined, ArrowLeftOutlined } from "@ant-design/icons"


class CurrentToolBtns extends React.Component {
    state = {
        curSign: undefined
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPageAndPost.os != this.props.currentPageAndPost.os ||
            nextProps.activePageComponentSign != this.props.activePageComponentSign) {
            this.setState({ curSign: undefined });
        }
    }

    // 获取当前组件和父组件
    getComponentSigns() {
        let cur = this.props.pageComponents[this.props.activePageComponentSign]
        if (!cur) {
            return [];
        }

        let signs = [this.props.activePageComponentSign];

        while (this.props.pageComponents[cur.parentSign] && cur.parentSign != PageComponentModel.RootComponentSign) {
            signs.push(cur.parentSign);
            cur = this.props.pageComponents[cur.parentSign];
        }

        return signs;
    }

    render() {
        if (!this.props.activePageComponentSign) {
            return <></>
        }

        let signs = this.getComponentSigns();

        return (
            <div>
                <div style={{ right: 80, bottom: 150, position: "fixed", display: 'flex' }} >
                    {
                        signs.map(item => (
                            <div
                                style={{display: 'flex', alignItems: 'center'}}
                                onMouseEnter={() => {
                                    this.setState({ curSign: item });
                                }}
                            >
                                <Button 
                                    type='primary'
                                    size='small'
                                    icon={<ShareAltOutlined />}
                                    onClick={() => {
                                        this.props.setActiveComponent(item);
                                    }}
                                ></Button>
                                <ArrowLeftOutlined className='ml-2 mr-2' />
                            </div>
                        ))
                    }
                </div>
                <SignSquareFrame
                    activePageComponentSign={this.state.curSign}
                    currentPageAndPost={this.props.currentPageAndPost}
                    color="#ff7a45"
                    rootElementId={this.props.rootElementId}
                />
            </div>
        );
    }
}

CurrentToolBtns.propTypes = {
    // 如下属性由父组件传入
    currentPageAndPost: PropTypes.object.isRequired,
    rootElementId: PropTypes.object,

    activePageComponentSign: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => {
    return {
        activePageComponentSign: state.activePageComponentSign,
        pageComponents: state.pageComponents[ownProps.currentPageAndPost.pageId][ownProps.currentPageAndPost.os]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setActiveComponent: (sign) => {
            return dispatch(setActiveComponent(sign));
        }
    }
}

export default CmsRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(CurrentToolBtns);