import React from 'react'
import PropTypes from 'prop-types'

import ToolBtns from './ToolBtns'
import { SignSquareFrame } from './SignSquareFrame'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import {RootComponentSign} from 'BaseCMSManage/IEReduxs/Actions'

class CurrentToolBtns extends React.Component {
    state = {
        curSign: undefined
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.os != this.props.os ||
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

        while (this.props.pageComponents[cur.parentSign] && cur.parentSign != RootComponentSign) {
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
                <span style={{ right: 80, bottom: 120, position: "fixed" }} >
                    {
                        signs.map(item => (
                            <div
                                onMouseEnter={() => {
                                    this.setState({ curSign: item });
                                }}
                            >
                                <ToolBtns
                                    key={item}
                                    os={this.props.os}
                                    sign={item}
                                    pageId={this.props.pageId}
                                    pageDataId={this.props.pageDataId}
                                    style={{ opacity: 1, marginBottom: "5px" }}
                                    placement={'left'}
                                />
                            </div>
                        ))
                    }
                </span>
                <SignSquareFrame
                    activePageComponentSign={this.state.curSign}
                    os={this.props.os}
                    color="#ff7a45"
                />
            </div>
        );
    }
}

CurrentToolBtns.propTypes = {
    // 如下属性由父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    os: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        activePageComponentSign: state.activePageComponentSign,
        pageComponents: state.pageComponents[ownProps.pageId][ownProps.os]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default CmsRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(CurrentToolBtns);