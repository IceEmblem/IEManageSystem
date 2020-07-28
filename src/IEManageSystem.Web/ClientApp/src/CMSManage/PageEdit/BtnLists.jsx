import React from 'react';
import ListBtn from 'ListBtn'
import PropTypes from 'prop-types'

import { Animate } from 'react-move'
import { easeExpOut, easeQuadInOut, easeCubic, easeCubicInOut } from 'd3-ease'

import { Button, Popover, Input, Tag, Select } from 'antd';
import { PlusCircleOutlined, InfoCircleOutlined, SyncOutlined, SaveOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons"

import { ieReduxFetch } from 'Core/IEReduxFetch';
import { setPage } from '../IEReduxs/Actions'
import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'

import "./BtnLists.css";

const { Option } = Select;

const Layout = (props) => {
    return (
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择页面"
                optionFilterProp="children"
                onChange={props.onChange}
                dropdownStyle={{zIndex: 9999}}
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

class BtnLists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            pages: [],
        }

        this.selectPageLayout = this.selectPageLayout.bind(this);
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
            this.props.setPage(this.props.page, value.pageComponents, value.defaultComponentDatas);
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
                                    <Button
                                        icon={<PlusCircleOutlined />}
                                        className="bg-success border-success text-white"
                                        onClick={() => {
                                            this.setState({});
                                            this.props.addComponent();
                                        }}
                                    >添加组件</Button>
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
                                            this.setState({});
                                            this.props.exportPage();
                                        }}
                                    >导出页面</Button>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={() => {
                                            this.setState({});
                                            this.props.submitPage();
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

    addComponent: PropTypes.func.isRequired,
    submitPage: PropTypes.func.isRequired,
    exportPage: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        page: state.pages[ownProps.pageId],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPage: (page, pageComponents, defaultComponentDatas) => {
            dispatch(setPage(page, pageComponents, defaultComponentDatas));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(BtnLists)

export default Contain;