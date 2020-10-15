import React from 'react';
import ListBtn from 'Common/ListBtn'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import { Button, Popover, Input, Tag, Select, Tooltip } from 'antd';
import { PlusCircleOutlined, InfoCircleOutlined, SyncOutlined, SaveOutlined, VerticalAlignBottomOutlined, CopyOutlined } from "@ant-design/icons"

import { ieReduxFetch } from 'Core/IEReduxFetch';
import { setPage, CopyComponentAction, } from 'BaseCMSManage/IEReduxs/Actions'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import PageComponentModel, { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'

import {
    pageComponentUpdateFetch,
} from 'BaseCMSManage/IEReduxs/Actions'
import { IContainerConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import {IocContainer} from 'ice-common'

import {Theme} from 'ice-common'

import { Motion, spring, presets } from 'react-motion'

import "./BtnLists.css";

const { Option } = Select;

const AddComponentBtn = (props) => {
    return <Button
        icon={<PlusCircleOutlined />}
        style={{ backgroundColor: Theme.color1, borderColor: Theme.color1 }}
        onClick={props.onClick}
    >添加组件</Button>
}

const PageSelect = (props) => {
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
            suffix={<Tag color={Theme.primary}>显示名称</Tag>}
        />
    </div>
    <div className="mb-3">
        <Input
            placeholder="背景颜色"
            value={props.page.name}
            disabled={true}
            suffix={<Tag color={Theme.primary}>页面名称</Tag>}
        />
    </div>
    <div className="mb-3">
        <Input
            placeholder="背景颜色"
            value={props.page.description}
            disabled={true}
            suffix={<Tag color={Theme.primary}>页面描述</Tag>}
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
        this.changePage = this.changePage.bind(this);
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
        ieReduxFetch(
            `/Pages/${pageName}.json`,
            null,
            "get",
            false
        ).then(value => {
            this.props.setPage(this.props.page, value.pageComponents, value.defaultComponentDatas, this.props.pageInfos.os);
        });
    }

    changePage(pageName) {
        this.props.history.push(`/ManageHome/CMSManage/PageEdit/${pageName}/${this.props.pageInfos.os}`);
    }

    render() {
        return (
            <div className="PageContainer-btnlists align-items-center d-flex">
                <Motion style={{ x: spring(this.state.open ? 660 : 0, presets.gentle), }}>
                    {interpolatingStyle => {
                        return (
                            <div className="d-flex justify-content-between overflow-hidden-x" style={{ width: `${interpolatingStyle.x}px` }}>
                                <this.ContainerConfigBtnComponent
                                    sign={PageComponentModel.RootComponentSign}
                                    currentPageAndPost={{
                                        os: this.props.pageInfos.os,
                                        page: this.props.page,
                                        pageData: undefined,
                                        isExistPageData: false,
                                        pageComponents: this.props.pageComponents,
                                        defaultComponentDatas: undefined,
                                        contentComponentDatas: undefined,
                                    }}
                                    btnComponent={AddComponentBtn}
                                />
                                <Popover
                                    content={<PageSelect
                                        pages={this.state.pages}
                                        onChange={this.selectPageLayout}
                                    />}
                                    title="Title"
                                    trigger="click">
                                    <Button
                                        icon={<VerticalAlignBottomOutlined />}
                                        style={{ backgroundColor: Theme.color2, borderColor: Theme.color2 }}
                                    >导入模板</Button>
                                </Popover>
                                <Popover content={<PageInfo page={this.props.page} />} title="页面信息" trigger="click">
                                    <Button
                                        icon={<InfoCircleOutlined />}
                                        style={{ backgroundColor: Theme.color3, borderColor: Theme.color3 }}
                                    >页面信息</Button>
                                </Popover>
                                <Popover
                                    content={<PageSelect
                                        pages={this.state.pages}
                                        onChange={this.changePage}
                                    />}
                                    title="Title"
                                    trigger="click">
                                    <Button
                                        icon={<SyncOutlined />}
                                        style={{ backgroundColor: Theme.color4, borderColor: Theme.color4 }}
                                    >切换页面</Button>
                                </Popover>
                                <Popover
                                    content={<OSType
                                        page={this.props.page}
                                        importWebComponent={() => {
                                            if (this.props.pageInfos.os == PageComponentOSType.Web) {
                                                return;
                                            }
                                            this.props.copyComponent(this.props.pageInfos.os, PageComponentOSType.Web)
                                        }}
                                        importNativeComponent={() => {
                                            if (this.props.pageInfos.os == PageComponentOSType.Native) {
                                                return;
                                            }
                                            this.props.copyComponent(this.props.pageInfos.os, PageComponentOSType.Native)
                                        }}
                                    />}
                                    title="平台信息"
                                    trigger="click"
                                >
                                    <Button
                                        icon={<InfoCircleOutlined />}
                                        style={{ backgroundColor: Theme.color5, borderColor: Theme.color5 }}
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
                </Motion>
                <div className="d-flex align-items-center">
                    <ListBtn
                        open={this.state.open}
                        className=""
                        onClick={() => { this.setState({ open: !this.state.open }) }}
                    />
                </div>
            </div>
        );
    }
}

BtnLists.propTypes = {
    pageInfos: PropTypes.object.isRequired,

    page: PropTypes.object.isRequired,
    pageComponentUpdateFetch: PropTypes.func.isRequired,
    exportPage: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    copyComponent: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.pages[ownProps.pageInfos.pageName],
        pageComponents: state.pageComponents[ownProps.pageInfos.pageName],
        defaultComponentDatas: state.defaultComponentDatas[ownProps.pageInfos.pageName],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPage: (page, pageComponents, defaultComponentDatas, os) => {
            dispatch(setPage(page, pageComponents, defaultComponentDatas, os));
        },
        copyComponent: (distOS, sourceOS) => {
            dispatch(new CopyComponentAction(ownProps.pageInfos.pageName, distOS, sourceOS))
        },
        pageComponentUpdateFetch: (page, components, defaultComponentDatas) => {
            dispatch(pageComponentUpdateFetch(page, components, defaultComponentDatas));
        },
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        page: stateProps.page,
        pageComponents: stateProps.pageComponents[ownProps.pageInfos.os],
        ...ownProps,
        setPage: dispatchProps.setPage,
        copyComponent: dispatchProps.copyComponent,
        pageComponentUpdateFetch: () => {
            dispatchProps.pageComponentUpdateFetch(stateProps.page, stateProps.pageComponents, stateProps.defaultComponentDatas)
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
            a.download = `${stateProps.page.name}.json`
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

export default withRouter(Contain);