import React from 'react'
import PropTypes from 'prop-types'
import { IContainerConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import { Button, Tooltip, Modal, Tag } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import {
    setActiveComponent,
    AddComponentAction,
} from 'BaseCMSManage/IEReduxs/Actions'
import IocContainer from 'Core/IocContainer';
import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import ComponentListBox from './ComponentListBox'
import IETool from 'Core/ToolLibrary/IETool'


class ContainerConfigBtnComponent extends IContainerConfigBtnComponent {
    state = {
        showCustomizeModal: false,
        configName: undefined,
        clonePageComponent: IETool.deepCopy(this.props.pageComponent),

        showComponentListBox: false
    }

    constructor(props) {
        super(props);

        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);

        this.addComponent = this.addComponent.bind(this);
        this.addComponentCustomize = this.addComponentCustomize.bind(this);
    }

    addComponent(componentDescribe) {
        let pageComponent = componentDescribe.createPageComponent(this.props.sign, this.props.currentPageAndPost.os);

        this.props.addComponent(pageComponent);

        // 页面渲染结束后，设置新添加的组件为活跃组件
        setTimeout(() => this.props.setActiveComponent(pageComponent.sign), 0);
    }

    commonComponent() {
        // 如果子元素数目有限制
        if (this.props.itemNum > 0 && this.props.pageComponent.pageComponentSigns.length >= this.props.itemNum) {
            return <></>
        }

        return <>
            {
                this.props.btnComponent ?
                    <this.props.btnComponent
                        onClick={() => this.setState({ showComponentListBox: true })}
                    /> :
                    <Tooltip
                        title={`添加组件`}
                    >
                        <Button size='small' shape="round"
                            type={"default"}
                            icon={<AppstoreAddOutlined />}
                            onClick={() => {
                                this.setState({ showComponentListBox: true })
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

    addComponentCustomize(componentDescribe) {
        let pageComponent = componentDescribe.createPageComponent(this.props.sign, this.props.currentPageAndPost.os);
        pageComponent.group = this.state.configName

        this.props.addComponent(pageComponent);

        // 页面渲染结束后，设置新添加的组件为活跃组件
        setTimeout(() => this.props.setActiveComponent(pageComponent.sign), 0);
    }

    customizeComponent() {
        return <>
            {
                this.props.btnComponent ?
                    <this.props.btnComponent
                        onClick={() => this.setState({ showCustomizeModal: true })}
                    /> :
                    <Tooltip
                        title={`添加组件`}
                    >
                        <Button size='small' shape="round"
                            type={"default"}
                            icon={<AppstoreAddOutlined />}
                            onClick={() => {
                                this.setState({ showCustomizeModal: true })
                            }}
                        />
                    </Tooltip>
            }
            <Modal
                title='选择组件'
                visible={this.state.showCustomizeModal}
                onCancel={() => {
                    this.setState({ showCustomizeModal: false });
                }}
                onOk={() => {
                    this.setState({ showCustomizeModal: false });
                }}
                zIndex={9999}
                okText='提交'
                cancelText='取消'
                okButtonProps={{disabled: true}}
            >
                <div className='d-flex flex-wrap'>
                    {
                        this.props.containerConfigs.map(item => {
                            let disabled = false;
                            let a=this.props.pageComponent.pageComponentSigns;
                            this.props.pageComponent.pageComponentSigns.forEach(e=>{
                                let child = this.props.pageComponents[e];
                                if(child.group == item.name){
                                    disabled = true;
                                }
                            })

                            return <div className='col-md-6 mb-3'>
                                <Tag color="#55acee">{item.displayName}</Tag>
                                <Button icon={<AppstoreAddOutlined />}
                                    disabled={disabled}
                                    onClick={() => {
                                        this.setState({
                                            showComponentListBox: true,
                                            configName: item.name,
                                            clonePageComponent: IETool.deepCopy(this.props.pageComponent),
                                        })
                                    }}
                                />
                            </div>
                        })
                    }
                </div>
            </Modal>
            <ComponentListBox
                show={this.state.showComponentListBox}
                close={() => { this.setState({ showComponentListBox: false }) }}
                addComponent={this.addComponentCustomize}
            />
        </>
    }

    render() {
        if (this.props.containerConfigs) {
            return this.customizeComponent();
        }
        else {
            return this.commonComponent();
        }
    }
}

ContainerConfigBtnComponent.propTypes = {
    sign: PropTypes.string.isRequired,
    currentPageAndPost: PropTypes.object.isRequired,
    itemNum: PropTypes.number.isRequired,
    // 显示的的按钮
    btnComponent: PropTypes.func,

    pageComponent: PropTypes.object.isRequired,
    addComponent: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageId = ownProps.currentPageAndPost.pageId;
    let os = ownProps.currentPageAndPost.os;

    let pageComponent = state.pageComponents[pageId][os][ownProps.sign];

    return {
        pageComponent: pageComponent,
        pageComponents: state.pageComponents[pageId][os],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (pageComponent) => {
            return dispatch(new AddComponentAction(
                ownProps.currentPageAndPost.pageId,
                ownProps.currentPageAndPost.os,
                pageComponent
            ));
        },
        setActiveComponent: (sign) => {
            return dispatch(setActiveComponent(sign));
        }
    }
}

IocContainer.registerSingleIntances(IContainerConfigBtnComponent, CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ContainerConfigBtnComponent));