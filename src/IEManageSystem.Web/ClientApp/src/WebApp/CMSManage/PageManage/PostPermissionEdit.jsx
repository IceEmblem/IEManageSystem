import React from 'react'
import { ieReduxFetch } from 'Core/IEReduxFetch';
import { Modal, Button, Checkbox, Switch, Typography, Card } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export default class PostPermissionEdit extends React.Component {
    state = {
        contentPagePeimissionCollection: {
            contentPagePermissions: [],
            isEnableQueryPermission: false,
            pageName: null,
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

        if (this.props.show) {
            this.getPage(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.getPage(nextProps);
        }
    }

    getPage(props) {
        ieReduxFetch("/api/PageQuery/GetPagePermissions", {
            name: props.pageName
        }).then(value => {
            this.setState({
                contentPagePeimissionCollection: value.contentPagePeimissionCollection
            });
        });
    }

    updatePagePeimission() {
        ieReduxFetch("/api/PageManage/UpdateContentPagePermission", {
            name: this.props.pageName,
            contentPagePeimissionCollection: this.state.contentPagePeimissionCollection
        }).then(value => {
            this.props.close();
        });
    }

    render() {

        return (<Modal
            title={`${this.props.pageName} 信息`}
            visible={this.props.show}
            onOk={() => this.updatePagePeimission()}
            onCancel={this.props.close}
        >
            <Card className="mb-3" bordered={false} title={<h6>文章管理权限<small className="ml-3">能够发表，修改，删除文章</small></h6>}>
                <Checkbox.Group
                    options={this.state.permissionOptions}
                    value={this.state.contentPagePeimissionCollection.contentPagePermissions.filter(item => item.isManage).map(item=>item.permissionId)}
                    onChange={(values) => {
                        this.state.contentPagePeimissionCollection.contentPagePermissions =
                            this.state.contentPagePeimissionCollection.contentPagePermissions.filter(item => item.isManage == false);
                        values.forEach(item => {
                            this.state.contentPagePeimissionCollection.contentPagePermissions.push({ permissionId: item, isManage: true });
                        });
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
                        checked={this.state.contentPagePeimissionCollection.isEnableQueryPermission}
                        onChange={(checked) => {
                            this.state.contentPagePeimissionCollection.isEnableQueryPermission = checked;
                            this.setState({});
                        }} />
                </div>
                <div>
                    <Checkbox.Group
                        options={this.state.permissionOptions}
                        value={this.state.contentPagePeimissionCollection.contentPagePermissions.filter(item => !item.isManage).map(item=>item.permissionId)}
                        onChange={(values) => {
                            this.state.contentPagePeimissionCollection.contentPagePermissions =
                                this.state.contentPagePeimissionCollection.contentPagePermissions.filter(item => item.isManage == true);
                            values.forEach(item => {
                                this.state.contentPagePeimissionCollection.contentPagePermissions.push({ permissionId: item, isManage: false });
                            });
                            this.setState({});
                        }}
                    ></Checkbox.Group>
                </div>
            </Card>
        </Modal>);
    }
}