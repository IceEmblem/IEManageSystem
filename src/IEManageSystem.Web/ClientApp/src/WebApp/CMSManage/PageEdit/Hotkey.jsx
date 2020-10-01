import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { setActiveComponent } from 'BaseCMSManage/IEReduxs/Actions'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'

import { Button, Popover } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"

class Hotkey extends React.Component {
    componentDidMount() {
        document.addEventListener("keydown", this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
    }

    keyDown = (e) => {
        var ctrlKey = e.ctrlKey || e.metaKey;
        if(!ctrlKey){
            return;
        }

        if (e.keyCode == 37) {
            e.preventDefault();
            this.toLeft();
            return;
        }
        else if (e.keyCode == 38) {
            e.preventDefault();
            this.toUp();
            return;
        }
        else if (e.keyCode == 39) {
            e.preventDefault();
            this.toRight();
            return;
        }
        else if (e.keyCode == 40) {
            e.preventDefault();
            this.toDown();
            return;
        }
    }

    toUp = () => {
        let pageComponent = this.props.pageComponents[this.props.activePageComponentSign];

        if (!pageComponent || pageComponent.parentSign == PageComponentModel.RootComponentSign) {
            return;
        }

        this.props.setActiveComponent(pageComponent.parentSign);
    }

    toDown = () => {
        let pageComponent = this.props.pageComponents[this.props.activePageComponentSign];

        if (!pageComponent || pageComponent.pageComponentSigns.length == 0) {
            return;
        }

        this.props.setActiveComponent(pageComponent.pageComponentSigns[0]);
    }

    toLeft = () => {
        let pageComponent = this.props.pageComponents[this.props.activePageComponentSign];

        if (!pageComponent) {
            return;
        }

        let parentComponent = this.props.pageComponents[pageComponent.parentSign];
        if (!parentComponent) {
            return;
        }

        // 如果当前索引为 0 ，则转到最后一个
        let currentIndex = parentComponent.pageComponentSigns.findIndex(e => e == pageComponent.sign);
        if (currentIndex == 0) {
            this.props.setActiveComponent(parentComponent.pageComponentSigns[parentComponent.pageComponentSigns.length - 1]);
            return;
        }

        this.props.setActiveComponent(parentComponent.pageComponentSigns[currentIndex - 1]);
        return;
    }

    toRight = () => {
        let pageComponent = this.props.pageComponents[this.props.activePageComponentSign];

        if (!pageComponent) {
            return;
        }

        let parentComponent = this.props.pageComponents[pageComponent.parentSign];
        if (!parentComponent) {
            return;
        }

        // 如果当前索引为最后一个，则转到 0
        let currentIndex = parentComponent.pageComponentSigns.findIndex(e => e == pageComponent.sign);
        if (currentIndex == parentComponent.pageComponentSigns.length - 1) {
            this.props.setActiveComponent(parentComponent.pageComponentSigns[0]);
            return;
        }

        this.props.setActiveComponent(parentComponent.pageComponentSigns[currentIndex + 1]);
        return;
    }

    render() {
        let pageComponent = this.props.pageComponents[this.props.activePageComponentSign];
        if(!pageComponent){
            return <></>
        }

        return <div>
            <Popover content={<>
                <div className='mb-1'>向上：Ctrl + Up</div>
                <div className='mb-1'>向下：Ctrl + Down</div>
                <div className='mb-1'>向左：Ctrl + Left</div>
                <div className='mb-1'>向右：Ctrl + Right</div>
            </>}>
                <Button type='primary' >快捷按钮</Button>
            </Popover>
            {
                pageComponent.pageComponentSigns.map(sign => {
                    return (<Button
                        key={sign}
                        className='ml-3'
                        size='small'
                        shape='circle'
                        icon={<ArrowDownOutlined />}
                        onClick={(e) => {
                            this.props.setActiveComponent(sign);
                        }}
                    ></Button>)
                })
            }
            <Button
                className='ml-3'
                size='small'
                shape='circle'
                icon={<ArrowUpOutlined />}
                onClick={(e) => {
                    if (PageComponentModel.RootComponentSign == pageComponent.parentSign) {
                        return false;
                    }

                    this.props.setActiveComponent(pageComponent.parentSign);
                }}
            ></Button>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        activePageComponentSign: state.activePageComponentSign,
        pageComponents: state.pageComponents[ownProps.currentPageAndPost.pageName][ownProps.currentPageAndPost.os],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setActiveComponent: (sign) => {
            return dispatch(setActiveComponent(sign));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
)(Hotkey)

export default Contain;