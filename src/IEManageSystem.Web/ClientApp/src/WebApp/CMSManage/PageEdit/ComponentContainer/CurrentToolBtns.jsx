import React from 'react'
import PropTypes from 'prop-types'

import ToolBtns from './ToolBtns'
import SignSquareFrame from './SignSquareFrame'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'


class CurrentToolBtns extends React.Component {
    state = {
        curSign: undefined
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPageAndPost.os != this.props.currentPageAndPost.os ||
            nextProps.activePageComponentSign != this.props.activePageComponentSign) 
        {
            this.setState({curSign: undefined});
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
                <span style={{ right: 80, bottom: 150, position: "fixed" }} >
                    {
                        signs.map(item => (
                            <div
                                onMouseEnter={() => {
                                    this.setState({ curSign: item });
                                }}
                            >
                                <ToolBtns
                                    key={item}
                                    currentPageAndPost={this.props.currentPageAndPost}
                                    sign={item}
                                    style={{ opacity: 1, marginBottom: "5px" }}
                                    placement={'left'}
                                    cancelActiveShow={true}
                                />
                            </div>
                        ))
                    }
                </span>
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
    }
}

export default CmsRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(CurrentToolBtns);