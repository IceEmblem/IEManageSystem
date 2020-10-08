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

    ctime = undefined;
    componentWillReceiveProps(nextProps) {
        if (nextProps.pageInfos.pageName != this.props.pageInfos.pageName
            || nextProps.pageInfos.os != this.props.pageInfos.os) 
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
            || nextProps.defaultComponentDatas != this.props.defaultComponentDatas) 
        {
            // 多次连续渲染时，取消前面的保存
            if(this.ctime != undefined){
                clearTimeout(this.ctime);
            }

            this.ctime = setTimeout(()=>{
                let olds = this.state.componentAndDatas.splice(0, this.state.index + 1);
                olds.push({
                    pageComponents: nextProps.pageComponents,
                    defaultComponentDatas: nextProps.defaultComponentDatas,
                });
                this.state.componentAndDatas = olds;
                this.state.index = this.state.componentAndDatas.length - 1;

                this.ctime = undefined;
            }, 0);
        }
    }

    // 撤销
    cancel = () => {
        if (this.state.index <= 0) {
            return;
        }

        this.setState({ index: this.state.index - 1, isListen: false }, () => {
            let componentAndData = this.state.componentAndDatas[this.state.index];
            this.props.dispatchAction(new SetPageComponentsAction(
                this.props.pageInfos.pageName,
                this.props.pageInfos.os,
                componentAndData.pageComponents
            ));
            this.props.dispatchAction(new SetDefaultComponentDatasAction(
                this.props.pageInfos.pageName,
                componentAndData.defaultComponentDatas
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
                this.props.pageInfos.pageName,
                componentAndData.defaultComponentDatas
            ));
            this.props.dispatchAction(new SetPageComponentsAction(
                this.props.pageInfos.pageName,
                this.props.pageInfos.os,
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
        defaultComponentDatas: state.defaultComponentDatas[ownProps.pageInfos.pageName],
        pageComponents: state.pageComponents[ownProps.pageInfos.pageName][ownProps.pageInfos.os],
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