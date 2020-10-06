import React from 'react'

import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import RNComponentContainerBoxShow from 'Adapters/RNComponentContainerBoxShow'
import ToolBtns from './ToolBtns';

import { setActiveComponent } from 'BaseCMSManage/IEReduxs/Actions'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PageComponentModel, { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'

class EditComponentContainerBoxShow extends React.Component {
    oldBackgroundColor = undefined;
    render() {
        let ContainerBoxShow = undefined;
        // if (PageComponentOSType.Web == this.props.currentPageAndPost.os) {
        //     ContainerBoxShow = ComponentContainerBoxShow;
        // }
        // else {
        //     ContainerBoxShow = RNComponentContainerBoxShow
        // }

        ContainerBoxShow = ComponentContainerBoxShow;

        return <ContainerBoxShow
            style={{ ...this.props.style }}
            className={this.props.className}
            propsEX={{
                id: PageComponentModel.createPageComponentId(this.props.currentPageAndPost.os, this.props.sign),
                onClick: (e) => {
                    if (e.stopPropagation) {
                        // W3C阻止冒泡方法 
                        e.stopPropagation();
                    }
                    else {
                        // IE阻止冒泡方法
                        e.cancelBubble = true;
                    }
                    this.props.setActiveComponent();

                    return false;
                },
                onMouseEnter: (e) => {
                    this.oldBackgroundColor = e.currentTarget.style.backgroundColor;
                    e.currentTarget.style.backgroundColor = "#1890ff20";
                },
                onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = this.oldBackgroundColor;
                }
            }}
            ToolBtn={
                <ToolBtns
                    sign={this.props.sign}
                    currentPageAndPost={this.props.currentPageAndPost}
                    style={{ position: 'absolute', zIndex: 999 }}
                />
            }
        >
            {this.props.children}
        </ContainerBoxShow>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setActiveComponent: () => {
            return dispatch(setActiveComponent(ownProps.sign));
        }
    }
}

export default CmsRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(EditComponentContainerBoxShow);