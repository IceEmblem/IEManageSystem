import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import IETool from 'Core/ToolLibrary/IETool'
import { AddComponentAction, DefaultComponentDataUpdateAction } from 'BaseCMSManage/IEReduxs/Actions'
import { Button, message, Popover } from 'antd'
import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'

class ClipBoard extends React.Component {
    state = {
        // 拷贝页面的 pageComponents
        copyPageComponents: undefined,
        copyPageComponentSign: undefined,
        copyDefaultComponentDatas: undefined,
        os: undefined,
    }

    componentDidMount() {
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

        if (e.keyCode == 67) {
            this.copy();
            return;
        }

        if (e.keyCode == 86 && (e.target.localName == 'button' || e.target.localName == 'body' || e.target.localName == 'div')) {
            this.paste();
            return;
        }
    }

    copyComponent(pageComponent, parentSign) {
        let copyPageComponents = [];
        let copyDefaultComponentDatas = [];

        let copy = IETool.deepCopy(pageComponent);

        // 更新副本的 sign
        let index = 1;
        while (true) {
            index++;
            let copySign = `${copy.sign}_cp_${index}`;
            // 如果当前页面的 pageComponents 没有重复，则使用该 sign
            if (!this.props.pageComponents[copySign]) {
                copy.sign = copySign;
                break;
            }
        }
        // 更新副本的父元素 sign
        copy.parentSign = parentSign;
        // 更新副本的 子元素标识
        copy.pageComponentSigns = [];

        // 父元素必须先于子元素添加
        copyPageComponents.push(copy);

        // 拷贝默认数据
        if (this.state.copyDefaultComponentDatas[pageComponent.sign]) {
            let copyDefaultComponentData = IETool.deepCopy(this.state.copyDefaultComponentDatas[pageComponent.sign]);
            copyDefaultComponentData.sign = copy.sign;
            copyDefaultComponentDatas.push(copyDefaultComponentData);
        }

        pageComponent.pageComponentSigns.forEach(sign => {
            let childs = this.copyComponent(this.state.copyPageComponents[sign], copy.sign);
            // childs[0] 就是当前元素的子元素
            copy.pageComponentSigns.push(childs.copyPageComponents[0].sign);

            copyPageComponents = copyPageComponents.concat(childs.copyPageComponents);
            copyDefaultComponentDatas = copyDefaultComponentDatas.concat(childs.copyDefaultComponentDatas);
        });


        return {
            copyPageComponents,
            copyDefaultComponentDatas
        };
    }

    copy() {
        message.info('已复制组件 ' + this.props.activePageComponentSign);

        this.setState({
            copyPageComponents: this.props.pageComponents,
            copyPageComponentSign: this.props.activePageComponentSign,
            copyDefaultComponentDatas: this.props.defaultComponentDatas,
            os: this.props.currentPageAndPost.os
        });
    }

    paste() {
        // 没有拷贝数据，不支持拷贝
        if (!this.state.copyPageComponents || !this.state.copyPageComponentSign || !this.state.os) {
            return;
        }

        // 平台不同，不支持拷贝
        if (this.state.os != this.props.currentPageAndPost.os) {
            return;
        }

        // 要粘贴的位置
        let pageComponent = this.props.pageComponents[this.props.activePageComponentSign];
        if (!pageComponent) {
            return;
        }

        // 计算索引位置
        let sortIndex = 0;
        if (pageComponent.pageComponentSigns.length != 0) {
            let lastItemSign = pageComponent.pageComponentSigns[pageComponent.pageComponentSigns.length - 1];
            sortIndex = this.props.pageComponents[lastItemSign].pageComponentBaseSetting.sortIndex + 1;
        }

        // 获取需要拷贝的组件
        let needCopyPageComponent = this.state.copyPageComponents[this.state.copyPageComponentSign];
        if (!needCopyPageComponent) {
            return;
        }

        // 拷贝组件
        let copys = this.copyComponent(needCopyPageComponent, pageComponent.sign);
        // copys[0] 就是当前拷贝元素的根
        copys.copyPageComponents[0].pageComponentBaseSetting.sortIndex = sortIndex;

        // 查看组件是否允许添加子组件
        let componentDescribe = ComponentFactory.getComponentDescribeForName(pageComponent.name);
        if (!componentDescribe) {
            return;
        }
        let currentPageComponentChilds = pageComponent.pageComponentSigns.map(sign => this.props.pageComponents[sign])
        let pasteResult = componentDescribe.paste(copys.copyPageComponents[0], pageComponent, currentPageComponentChilds);
        if (!pasteResult.isPass) {
            message.error(pasteResult.message);
            return;
        }

        // 循环将组件添加到页面
        copys.copyPageComponents.forEach(item => {
            this.props.addComponent(new AddComponentAction(
                this.props.currentPageAndPost.pageId,
                this.props.currentPageAndPost.os,
                item
            ));
        });

        // 循环将默认数据添加到页面
        copys.copyDefaultComponentDatas.forEach(item => {
            this.props.addDefaultComponentData(new DefaultComponentDataUpdateAction(
                this.props.currentPageAndPost.pageId,
                item.sign,
                item
            ));
        })
    }

    render() {
        return <div>
            <Popover content="Ctrl + C">
                <Button type='primary' onClick={() => this.copy()}>复制</Button>
            </Popover>
            <Popover content="Ctrl + V">
                <Button type='primary' onClick={() => this.paste()}>粘贴</Button>
            </Popover>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        activePageComponentSign: state.activePageComponentSign,
        defaultComponentDatas: state.defaultComponentDatas[ownProps.currentPageAndPost.pageId],
        pageComponents: state.pageComponents[ownProps.currentPageAndPost.pageId][ownProps.currentPageAndPost.os],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (addComponentAction) => {
            return dispatch(addComponentAction);
        },
        addDefaultComponentData: (defaultComponentDataUpdateAction) => {
            return dispatch(defaultComponentDataUpdateAction);
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
)(ClipBoard)

export default Contain;