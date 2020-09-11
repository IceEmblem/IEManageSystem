import React from 'react'

import ComponentContainerBoxShow from 'CMSManage/Component/ComponentContainerBoxs/ComponentContainerBoxShow'
import ToolBtns from './ToolBtns';

import { setActiveComponent } from 'BaseCMSManage/IEReduxs/Actions'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

class EditComponentContainerBoxShow extends React.Component {
    render() {
        return <ComponentContainerBoxShow
            style={{ ...this.props.style }}
            className={`${this.props.className} pageedit-componentcontainer`}
            propsEX={{
                id: `__component__${this.props.os}__${this.props.sign}`,
                onClick: (e) => {
                    if (e.stopPropagation) 
                    { 
                        // W3C阻止冒泡方法 
                        e.stopPropagation();
                    } 
                    else 
                    {
                        // IE阻止冒泡方法
                        e.cancelBubble = true; 
                    }
                    this.props.setActiveComponent();

                    return false;
                }
            }}
            ToolBtn={
                <ToolBtns
                    sign={this.props.sign}
                    currentPageAndPost={this.props.currentPageAndPost}
                    style={{position: 'absolute', zIndex: 999}}
                />
            }
        >
            {this.props.children}
        </ComponentContainerBoxShow>
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