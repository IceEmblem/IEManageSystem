import React from 'react'
import { ieReduxFetch } from 'Core/IEReduxFetch';
import { Modal, Button, Checkbox, Switch, Typography, Card } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export default class PostPermissionEdit extends React.Component {
    state = {
        page: null,
        contentPagePeimissionCollection: {
            managePermissions: [],
            isEnableQueryPermission: false,
            queryPermissions: []
        },
        permissionOptions: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ieReduxFetch("/api/PermissionManage/GetPermissions", {
            pageIndex: 1,
            pageSize: 9999,
            searchKey: ""
        }).then(value => {
            this.setState({ permissionOptions: value.permissions.map(item => ({ label: item.displayName, value: item.id })) });
        });

        this.getPage();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.getPage();
        }
    }

    getPage() {
        ieReduxFetch("/api/PageQuery/GetPage", {
            name: this.props.pageName
        }).then(value => {
            this.setState({
                page: value.page,
                contentPagePeimissionCollection: value.page.contentPagePeimissionCollection
            });
        });
    }

    updatePagePeimission(){
        ieReduxFetch("/api/PageQuery/GetPage", {
            name: this.props.pageName,
            contentPagePeimissionCollection: this.state.contentPagePeimissionCollection
        }).then(value => {
            this.props.close();
        });
    }

    render() {
        let managePermissions = [];
        let queryPermissions = [];
        if (this.state.contentPagePeimissionCollection) {
            managePermissions = this.state.contentPagePeimissionCollection.managePermissions.map(item => item.id);
            queryPermissions = this.state.contentPagePeimissionCollection.queryPermissions.map(item => item.id);
        }

        return (<Modal
            title={`${this.state.page ? this.state.page.name : ""} 信息`}
            visible={this.props.show}
            onOk={() => this.updatePagePeimission()}
            onCancel={this.props.close}
        >
            <Card className="mb-3" bordered={false} title={<h6>文章管理权限<small className="ml-3">能够发表，修改，删除文章</small></h6>}>
                <Checkbox.Group
                    options={this.state.permissionOptions}
                    value={this.state.contentPagePeimissionCollection.managePermissions.map(item => item.permissionId)}
                    onChange={(values) => {
                        this.state.contentPagePeimissionCollection.managePermissions = values.map(item => ({ permissionId: item }))
                        this.setState({});
                    }}
                ></Checkbox.Group>
            </Card>
            <Card bordered={false} title={<h6>文章查看权限<small className="ml-3">能够查看文章，禁用则所有人都能查看，默认禁用</small></h6>}>
                <div className="mb-4 d-flex align-items-center">
                    <span className="mr-3">启用/禁用</span>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={this.state.contentPagePeimissionCollection.IsEnableQueryPermission}
                        onChange={(checked) => {
                            this.state.contentPagePeimissionCollection.IsEnableQueryPermission = checked;
                            this.setState({});
                        }} />
                </div>
                <div>
                    <Checkbox.Group
                        options={this.state.permissionOptions}
                        value={this.state.contentPagePeimissionCollection.queryPermissions.map(item => item.permissionId)}
                        onChange={(values) => {
                            this.state.contentPagePeimissionCollection.queryPermissions = values.map(item => ({ permissionId: item }))
                            this.setState({});
                        }}
                    ></Checkbox.Group>
                </div>
            </Card>
        </Modal>);
    }
}