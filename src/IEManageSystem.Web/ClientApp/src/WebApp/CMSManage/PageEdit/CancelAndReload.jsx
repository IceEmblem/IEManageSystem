import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { SetDefaultComponentDatasAction, SetPageComponentsAction } from 'BaseCMSManage/IEReduxs/Actions'
import { Button, message, Popover } from 'antd'


class CancelAndReload extends React.Component {
    state = {
        componentAndDatas: [],
        index: -1,
        // 是否监听数据变化
        isListen: true,
    }

    componentDidMount() {
        this.setState({
            componentAndDatas: [{
                pageComponents: this.props.pageComponents,
                defaultComponentDatas: this.props.defaultComponentDatas,
            }],
            index: 0
        })

        document.addEventListener("keydown", this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
    }

    keyDown = (e) => {
        var ctrlKey = e.ctrlKey || e.metaKey;
        if (!(ctrlKey)) {
            return;
        }

        // Ctrl + Y
        if (e.keyCode == 89) {
            this.reload();
            return;
        }

        // Ctrl + Z
        if (e.keyCode == 90) {
            this.cancel();
            return;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPageAndPost.pageId != this.props.currentPageAndPost.pageId
            || nextProps.currentPageAndPost.os != this.props.currentPageAndPost.os) 
        {
            this.setState({
                componentAndDatas: [{
                    pageComponents: nextProps.pageComponents,
                    defaultComponentDatas: nextProps.defaultComponentDatas,
                }],
                index: 0
            })
        }

        if (!this.state.isListen) {
            return;
        }

        if (nextProps.pageComponents != this.props.pageComponents
            || nextProps.defaultComponentDatas != this.props.defaultComponentDatas) {
            let olds = this.state.componentAndDatas.splice(0, this.state.index + 1);
            olds.push({
                pageComponents: nextProps.pageComponents,
                defaultComponentDatas: nextProps.defaultComponentDatas,
            });
            this.state.componentAndDatas = olds;
            this.state.index = this.state.componentAndDatas.length - 1;
        }
    }

    // 撤销
    cancel = () => {
        if (this.state.index <= 0) {
            return;
        }

        this.setState({ index: this.state.index - 1, isListen: false }, () => {
            let componentAndData = this.state.componentAndDatas[this.state.index];
            this.props.dispatchAction(new SetDefaultComponentDatasAction(
                this.props.currentPageAndPost.pageId,
                componentAndData.defaultComponentDatas
            ));
            this.props.dispatchAction(new SetPageComponentsAction(
                this.props.currentPageAndPost.pageId,
                this.props.currentPageAndPost.os,
                componentAndData.pageComponents
            ));

            setTimeout(() => this.setState({ isListen: true }), 0);
        })
    }

    // 重做
    reload = () => {
        if (this.state.index >= this.state.componentAndDatas.length - 1) {
            return;
        }

        this.setState({ index: this.state.index + 1, isListen: false }, () => {
            let componentAndData = this.state.componentAndDatas[this.state.index];
            this.props.dispatchAction(new SetDefaultComponentDatasAction(
                this.props.currentPageAndPost.pageId,
                componentAndData.defaultComponentDatas
            ));
            this.props.dispatchAction(new SetPageComponentsAction(
                this.props.currentPageAndPost.pageId,
                this.props.currentPageAndPost.os,
                componentAndData.pageComponents
            ));

            setTimeout(() => this.setState({ isListen: true }), 0);
        })
    }

    render() {
        return <div>
            <Popover content="Ctrl + Z">
                <Button type='primary' onClick={this.cancel}>撤销</Button>
            </Popover>
            <Popover content="Ctrl + Y">
                <Button type='primary' onClick={this.reload}>重做</Button>
            </Popover>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        defaultComponentDatas: state.defaultComponentDatas[ownProps.currentPageAndPost.pageId],
        pageComponents: state.pageComponents[ownProps.currentPageAndPost.pageId][ownProps.currentPageAndPost.os],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchAction: (action) => {
            return dispatch(action);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
)(CancelAndReload)

export default Contain;