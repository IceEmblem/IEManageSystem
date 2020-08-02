import React from 'react';
import './UserInfo.css';
import imgAvatar from 'images/default_avatar.png';
import { getUserInfoFetch, setUserInfoFetch } from '../IEReduxs/Actions'
import IERedux from '../IEReduxs/PersonalRedux'
import IETool from 'Common/ToolLibrary/IETool'

import { Radio, Card, Upload, Input, Tooltip, Button, Skeleton, Tag, Calendar } from 'antd';
import { UploadOutlined, UserOutlined, InfoCircleOutlined, EditOutlined, ReloadOutlined, SmileOutlined } from '@ant-design/icons';

const { Meta } = Card;

class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.headSculptureBase64 = "";

        this.state = {
            userName: "",
            emailAddress: "",
            emailAddressReadonly: true,
            name: "",
            nameReadonly: true,
            phone: "",
            phoneReadonly: true,
            personSignature: "",
            headSculpture: "",
            realName: "",
            realNameReadonly: true,
            idNumber: "",
            idNumberReadonly: true,
            address: "",
            addressReadonly: true,
            sex: false,
            birthDate: "",
            birthDateReadonly: true
        };
        this.setNextStateForProps(this.props);

        this._readFile = this._readFile.bind(this);
        this._getUserInfo = this._getUserInfo.bind(this);
        this._setUserInfo = this._setUserInfo.bind(this);
    }

    componentDidMount() {
        if (!this.props.userInfoData.invalidate) {
            return;
        }

        this._getUserInfo();
    }

    componentWillUpdate(props) {
        this.setNextStateForProps(props);
    }

    setNextStateForProps(props) {
        if (!props.userInfoData.user) {
            return;
        }

        let birthDate = props.userInfoData.user.birthDate != null ?
            (new Date(props.userInfoData.user.birthDate)).Format("yyyy-MM-dd") :
            "";

        Object.assign(this.state, {
            userName: props.userInfoData.user.account.userName,
            emailAddress: props.userInfoData.user.emailAddress,
            name: props.userInfoData.user.name,
            phone: props.userInfoData.user.phone,
            personSignature: props.userInfoData.user.personSignature,
            headSculpture: props.userInfoData.user.headSculpture,
            realName: props.userInfoData.user.realName,
            idNumber: props.userInfoData.user.idNumber,
            address: props.userInfoData.user.address,
            sex: props.userInfoData.user.sex,
            birthDate: birthDate
        });
    }

    _readFile(file) {
        IETool.imageToBase64String(file, (base64) => {
            this.headSculptureBase64 = base64;
            this.setState({ headSculpture: base64 });
        });
    }

    _getUserInfo() {
        let postData = {};

        this.props.getUserInfoFetch(postData);
    }

    _setUserInfo() {
        let postData = {
            userName: this.state.userName,
            emailAddress: this.state.emailAddress,
            name: this.state.name,
            phone: this.state.phone,
            personSignature: this.state.personSignature,
            headSculpture: this.headSculptureBase64,
            realName: this.state.realName,
            idNumber: this.state.idNumber,
            address: this.state.address,
            sex: this.state.sex,
            birthDate: this.state.birthDate,
        };

        this.props.setUserInfoFetch(postData);
    }

    render() {
        let userInfoHeadSculpture = (this.state.headSculpture === null || this.state.headSculpture === "" || this.state.headSculpture == undefined) ? imgAvatar : this.state.headSculpture;
        return (
            <div className="hide-scroll">
                <div>
                    <div className="userinfo">
                        <div className="w-100 d-flex">
                            <div className="d-flex bg-white col-md-8 float-left">
                                <div className="card border-0 userinfo-introduce w-50 pt-2 pb-2">
                                    <Card
                                        hoverable
                                        cover={
                                            <Upload
                                                name="avatar"
                                                showUploadList={false}
                                                beforeUpload={(file) => {
                                                    this._readFile(file);
                                                    return false;
                                                }}
                                            >
                                                <img className="w-100" alt={this.state.name} src={userInfoHeadSculpture} />
                                            </Upload>
                                        }
                                    >
                                        <Meta description={this.state.personSignature} />

                                    </Card>
                                </div>
                                <div className="card border-0 text-white flex-grow-1 userinfo-transparent">
                                    <div className="card-body">
                                        <div className="input-group mb-3 w-75 float-left">
                                            <Input
                                                value={this.state.userName}
                                                prefix={<Tag icon={<UserOutlined />} color="#55acee">账号</Tag>}
                                                suffix={
                                                    <Tooltip title="无法修改账号">
                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                    </Tooltip>
                                                }
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <Input
                                                value={this.state.name}
                                                prefix={<Tag icon={<SmileOutlined />} color="#55acee">昵称</Tag>}
                                                suffix={
                                                    <Tooltip title="昵称">
                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                    </Tooltip>
                                                }
                                                onChange={
                                                    (event) => {
                                                        this.setState({ name: event.target.value });
                                                    }
                                                }
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <Input
                                                value={this.state.phone}
                                                prefix={<Tag color="#55acee">手机号&#8194;</Tag>}
                                                suffix={
                                                    <Tooltip title="手机号">
                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                    </Tooltip>
                                                }
                                                onChange={
                                                    (event) => {
                                                        this.setState({ phone: event.target.phone });
                                                    }
                                                }
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <Input
                                                value={this.state.emailAddress}
                                                prefix={<Tag color="#55acee">邮箱号&#8194;</Tag>}
                                                suffix={
                                                    <Tooltip title="邮箱号">
                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                    </Tooltip>
                                                }
                                                onChange={
                                                    (event) => {
                                                        this.setState({ emailAddress: event.target.emailAddress });
                                                    }
                                                }
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <Input.TextArea placeholder="输入你的个性签名" allowClear
                                                autoSize={{ minRows: 4, maxRows: 6 }}
                                                value={this.state.personSignature}
                                                onChange={
                                                    (event) => {
                                                        this.setState({ personSignature: event.target.value });
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 float-left">
                                <Calendar fullscreen={false} />
                            </div>
                        </div>

                        <Card className="w-100 mt-3" title="完善个人信息" bordered={false}>
                            <div className="col-md-8 float-left">
                                <div className="input-group mb-3">
                                    <Input
                                        value={this.state.realName}
                                        prefix={<Tag color="#55acee">真实姓名</Tag>}
                                        disabled={this.state.realNameReadonly}
                                        suffix={
                                            <Button type="primary" icon={<EditOutlined />}
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ realNameReadonly: !preState.realNameReadonly }));
                                                    }
                                                }
                                            >
                                                {this.state.realNameReadonly ? "编辑" : "保存"}
                                            </Button>
                                        }
                                        onChange={
                                            (event) => {
                                                this.setState({ realName: event.target.value });
                                            }
                                        }
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <Input
                                        value={this.state.idNumber}
                                        prefix={<Tag color="#55acee">身份证号</Tag>}
                                        disabled={this.state.idNumberReadonly}
                                        suffix={
                                            <Button type="primary" icon={<EditOutlined />}
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ idNumberReadonly: !preState.idNumberReadonly }));
                                                    }
                                                }
                                            >
                                                {this.state.idNumberReadonly ? "编辑" : "保存"}
                                            </Button>
                                        }
                                        onChange={
                                            (event) => {
                                                this.setState({ idNumber: event.target.value });
                                            }
                                        }
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <Input
                                        value={this.state.address}
                                        prefix={<Tag color="#55acee">地&#12288;&#12288;址</Tag>}
                                        disabled={this.state.addressReadonly}
                                        suffix={
                                            <Button type="primary" icon={<EditOutlined />}
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ addressReadonly: !preState.addressReadonly }));
                                                    }
                                                }
                                            >
                                                {this.state.addressReadonly ? "编辑" : "保存"}
                                            </Button>
                                        }
                                        onChange={
                                            (event) => {
                                                this.setState({ address: event.target.value });
                                            }
                                        }
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <Input
                                        value={this.state.birthDate}
                                        prefix={<Tag color="#55acee">出生日期</Tag>}
                                        disabled={this.state.birthDateReadonly}
                                        suffix={
                                            <Button type="primary" icon={<EditOutlined />}
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ birthDateReadonly: !preState.birthDateReadonly }));
                                                    }
                                                }
                                            >
                                                {this.state.birthDateReadonly ? "编辑" : "保存"}
                                            </Button>
                                        }
                                        onChange={
                                            (event) => {
                                                this.setState({ birthDate: event.target.value });
                                            }
                                        }
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend userinfo-lable">
                                        <span className="input-group-text bg-info text-white border-0">性别</span>
                                    </div>
                                    <div className="ml-3 d-flex align-content-center align-items-center">
                                        <Radio.Group onChange={(event) => { this.setState({ sex: event.target.value }) }} value={this.state.sex}>
                                            <Radio value={true}>男</Radio>
                                            <Radio value={false}>女</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 float-left">
                                <Skeleton avatar paragraph={{ rows: 4 }} />
                            </div>
                        </Card>
                        <div className="w-100 mt-3 mb-3 d-flex justify-content-end">
                            <Button onClick={this._getUserInfo} icon={<ReloadOutlined />} >取消修改</Button>
                            <Button className="mr-2 ml-2" onClick={this._setUserInfo} type="primary" icon={<UploadOutlined />} >提交修改</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        userInfoData: state.userInfoData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfoFetch: (postData) => {
            dispatch(getUserInfoFetch(postData));
        },
        setUserInfoFetch: (postData) => {
            dispatch(setUserInfoFetch(postData));
        }
    }
}

const Contain = IERedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(UserInfo)

export default Contain