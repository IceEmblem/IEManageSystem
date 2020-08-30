import React from 'react';
import ListBtn from 'Common/ListBtn'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Animate } from 'react-move'
import { easeCubicInOut } from 'd3-ease'

import { Button, Popover, Input, Tag, Select, Tooltip } from 'antd';
import { PlusCircleOutlined, InfoCircleOutlined, SyncOutlined, SaveOutlined, VerticalAlignBottomOutlined, CopyOutlined } from "@ant-design/icons"

import { ieReduxFetch } from 'Core/IEReduxFetch';
import { setPage, CopyComponentAction, RootComponentSign, } from 'BaseCMSManage/IEReduxs/Actions'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'

import {
    pageComponentUpdateFetch,
} from 'BaseCMSManage/IEReduxs/Actions'
import { IContainerConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import IocContainer from 'Core/IocContainer'

import "./BtnLists.css";

const { Option } = Select;

const AddComponentBtn = (props) => {
    return <Button
        icon={<PlusCircleOutlined />}
        className="bg-success border-success text-white"
        onClick={props.onClick}
    >添加组件</Button>
}

const Layout = (props) => {
    return (
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择页面"
                optionFilterProp="children"
                onChange={props.onChange}
                dropdownStyle={{ zIndex: 9999 }}
            >
                {props.pages.map(item => (<Option value={item.name}>{item.displayName}</Option>))}
            </Select>
        </div>
    );
};

const PageInfo = (props) => (<div className="pageedit-page-container-header-info">
    <div className="mb-3">
        <Input
            placeholder="背景颜色"
            value={props.page.displayName}
            disabled={true}
            suffix={<Tag color="#55acee">显示名称</Tag>}
        />
    </div>
    <div className="mb-3">
        <Input
            placeholder="背景颜色"
            value={props.page.name}
            disabled={true}
            suffix={<Tag color="#55acee">页面名称</Tag>}
        />
    </div>
    <div className="mb-3">
        <Input
            placeholder="背景颜色"
            value={props.page.description}
            disabled={true}
            suffix={<Tag color="#55acee">页面描述</Tag>}
        />
    </div>
</div>)

const OSType = (props) => (<div>
    <div>
        <Link className="ant-btn w-75 mb-1 mr-1" to={`/ManageHome/CMSManage/PageEdit/${props.page.name}/Web`} >浏览器</Link>
        <Tooltip title="导入浏览器组件">
            <Button
                icon={<CopyOutlined />}
                onClick={props.importWebComponent}
            ></Button>
        </Tooltip>
    </div>
    <div>
        <Link className="ant-btn ant-btn-primary w-75 mr-1" to={`/ManageHome/CMSManage/PageEdit/${props.page.name}/Native`} >移动App</Link>
        <Tooltip title="导入移动App组件">
            <Button
                icon={<CopyOutlined />}
                onClick={props.importNativeComponent}
            ></Button>
        </Tooltip>
    </div>
</div>)

class BtnLists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            pages: [],
        }

        this.selectPageLayout = this.selectPageLayout.bind(this);
        this.ContainerConfigBtnComponent = IocContainer.getService(IContainerConfigBtnComponent);
    }

    componentDidMount() {
        this.getResourceList();
    }

    // 获取资源列表
    getResourceList() {
        let postData = {
            pageIndex: 1,
            pageSize: 9999,
        };

        ieReduxFetch("/api/PageQuery/GetPages", postData)
            .then(value => {
                this.setState({ pages: value.pages });
            });
    }

    selectPageLayout(pageName) {
        ieReduxFetch("/api/PageQuery/GetPage", {
            name: pageName
        }).then(value => {
            this.props.setPage(this.props.page, value.pageComponents, value.defaultComponentDatas, this.props.os);
        });
    }

    render() {
        return (
            <div className="PageContainer-btnlists">
                <div className="PageContainer-btnlists-bnts d-flex">
                    <Animate
                        start={() => ({
                            x: this.state.open ? 100 : 0,
                        })}

                        update={[
                            {
                                x: [this.state.open ? 100 : 0],
                                timing: { duration: 500, ease: easeCubicInOut },
                            }
                        ]}
                    >
                        {(state) => {
                            const { x } = state
                            return (
                                <div className="d-flex justify-content-end overflow-hidden-x" style={{ width: `${x}%` }}>
                                    <this.ContainerConfigBtnComponent
                                        pageId={this.props.pageId}
                                        pageDataId={undefined}
                                        os={this.props.os}
                                        sign={RootComponentSign}
                                        btnComponent={AddComponentBtn}
                                    />
                                    <Popover
                                        content={<Layout
                                            pages={this.state.pages}
                                            onChange={this.selectPageLayout}
                                        />}
                                        title="Title"
                                        trigger="click">
                                        <Button
                                            icon={<VerticalAlignBottomOutlined />}
                                            className="bg-secondary border-secondary text-white"
                                        >导入模板</Button>
                                    </Popover>
                                    <Popover content={<PageInfo page={this.props.page} />} title="页面信息" trigger="click">
                                        <Button
                                            icon={<InfoCircleOutlined />}
                                            className="bg-info border-info text-white"
                                        >页面信息</Button>
                                    </Popover>
                                    <Button
                                        icon={<SyncOutlined />}
                                        className="bg-warning border-warning text-white"
                                        onClick={() => {
                                            this.props.exportPage();
                                        }}
                                    >导出页面</Button>
                                    <Popover
                                        content={<OSType
                                            page={this.props.page}
                                            importWebComponent={() => {
                                                if (this.props.os == PageComponentOSType.Web) {
                                                    return;
                                                }
                                                this.props.copyComponent(this.props.os, PageComponentOSType.Web)
                                            }}
                                            importNativeComponent={() => {
                                                if (this.props.os == PageComponentOSType.Native) {
                                                    return;
                                                }
                                                this.props.copyComponent(this.props.os, PageComponentOSType.Native)
                                            }}
                                        />}
                                        title="平台信息"
                                        trigger="click"
                                    >
                                        <Button
                                            icon={<InfoCircleOutlined />}
                                            className="bg-dark border-dark text-white"
                                        >平台选择</Button>
                                    </Popover>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={() => {
                                            this.props.pageComponentUpdateFetch();
                                        }}
                                    >提交页面</Button>
                                </div>
                            )
                        }}
                    </Animate>
                    <div className="d-flex align-items-center">
                        <ListBtn
                            open={this.state.open}
                            className=""
                            onClick={() => { this.setState({ open: !this.state.open }) }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

BtnLists.propTypes = {
    pageId: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,

    page: PropTypes.object.isRequired,
    addComponent: PropTypes.func.isRequired,
    pageComponentUpdateFetch: PropTypes.func.isRequired,
    exportPage: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    copyComponent: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.pages[ownProps.pageId],
        pageComponents: state.pageComponents[ownProps.pageId],
        defaultComponentDatas: state.defaultComponentDatas[ownProps.pageId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPage: (page, pageComponents, defaultComponentDatas, os) => {
            dispatch(setPage(page, pageComponents, defaultComponentDatas, os));
        },
        copyComponent: (distOS, sourceOS) => {
            dispatch(new CopyComponentAction(ownProps.pageId, distOS, sourceOS))
        },
        pageComponentUpdateFetch: (name, components, defaultComponentDatas) => {
            dispatch(pageComponentUpdateFetch(name, components, defaultComponentDatas));
        },
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        page: stateProps.page,
        ...ownProps,
        setPage: dispatchProps.setPage,
        copyComponent: dispatchProps.copyComponent,
        pageComponentUpdateFetch: () => {
            dispatchProps.pageComponentUpdateFetch(stateProps.page.name, stateProps.pageComponents, stateProps.defaultComponentDatas)
        },
        exportPage: () => {
            if (!stateProps.page) {
                return;
            }

            let pageComponents = [];
            Object.values(stateProps.pageComponents).forEach(osComponents => pageComponents = pageComponents.concat(Object.values(osComponents)));

            let data = JSON.stringify({
                page: stateProps.page,
                pageComponents: pageComponents,
                defaultComponentDatas: Object.values(stateProps.defaultComponentDatas)
            })

            var blob = new Blob([data], { type: 'text/json' }),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a')
            a.download = 'page.json'
            a.href = window.URL.createObjectURL(blob)
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            a.dispatchEvent(e)
        },
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    mergeProps
)(BtnLists)

export default Contain;