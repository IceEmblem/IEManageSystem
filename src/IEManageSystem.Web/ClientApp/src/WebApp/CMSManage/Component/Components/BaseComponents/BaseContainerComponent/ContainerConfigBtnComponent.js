import React from 'react'
import PropTypes from 'prop-types'
import { IContainerConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import { Button, Tooltip } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import {
    AddComponentAction,
} from 'BaseCMSManage/IEReduxs/Actions'
import IocContainer from 'Core/IocContainer';
import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import ComponentListBox from './ComponentListBox'

class ContainerConfigBtnComponent extends IContainerConfigBtnComponent {
    state = {
        showComponentListBox: false
    }
    
    constructor(props) 
    {
        super(props);

        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);

        this.addComponent = this.addComponent.bind(this);
    }

    addComponent(componentDescribe) {
        let pageComponent = componentDescribe.createPageComponent(this.props.sign, this.props.os);

        this.props.addComponent(new AddComponentAction(
            this.props.pageId,
            this.props.os,
            pageComponent
        ));
    }

    render() {
        // 如果子元素数目有限制
        if(this.props.itemNum > 0 && this.props.pageComponent.pageComponentSigns.length >= this.props.itemNum){
            return <></>
        }

        return <>
            {
                this.props.btnComponent ? 
                <this.props.btnComponent 
                    onClick={()=>this.setState({showComponentListBox: true})}
                /> :
                <Tooltip
                    title={`添加组件`}
                >
                    <Button size='small' shape="round"
                        type={"default"}
                        icon={<AppstoreAddOutlined />}
                        onClick={() => { 
                            this.setState({showComponentListBox: true})
                        }}
                    />
                </Tooltip>
            }
            <ComponentListBox
                show={this.state.showComponentListBox}
                close={() => { this.setState({ showComponentListBox: false }) }}
                addComponent={this.addComponent}
            />
        </>
    }
}

ContainerConfigBtnComponent.propTypes = {
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    os: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    itemNum: PropTypes.number.isRequired,
    // 显示的的按钮
    btnComponent: PropTypes.func,

    pageComponent: PropTypes.object.isRequired,
    addComponent: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.os][ownProps.sign];

    return {
        pageComponent: pageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (addComponentAction) => {
            dispatch(addComponentAction);
        }
    }
}

IocContainer.registerSingleIntances(IContainerConfigBtnComponent, CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ContainerConfigBtnComponent));