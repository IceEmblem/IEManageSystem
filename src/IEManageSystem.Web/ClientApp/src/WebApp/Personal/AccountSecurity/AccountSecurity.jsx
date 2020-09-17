import React from 'react';
import './AccountSecurity.css';
import imgAvatar from 'images/default_avatar.png';
import { getUserInfoFetch, setUserInfoFetch, setSafetyProblemFetch, setPassageFetch } from 'BasePerson/IEReduxs/Actions'

import { Radio, Card, Upload, Input, Tooltip, Button, Tag, Modal } from 'antd';
import { UploadOutlined, UserOutlined, InfoCircleOutlined, EditOutlined, ReloadOutlined, SmileOutlined } from '@ant-design/icons';

import IERedux from 'BasePerson/IEReduxs/PersonalRedux'
import Theme from 'BaseLayout/Theme'


const { Meta } = Card;

class AccountSecurity extends React.Component {
    constructor(props) {
        super(props);

        this.headSculptureBase64 = "";

        this.state = {
            userName: "",
            emailAddress: "",
            name: "",
            phone: "",
            personSignature: "",
            headSculpture: "",
            problem: "",
            problemReadonly: true,
            answer: "",
            answerReadonly: true,
            oldPassword: "",
            newPassword: "",
            isShowModal: false
        };
        this.setNextStateForProps(this.props);

        this._getUserInfo = this._getUserInfo.bind(this);
        this._setSafetyProblem = this._setSafetyProblem.bind(this);
        this._setPassage = this._setPassage.bind(this);
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
            (new Date(props.userInfoData.user.birthDate)).toDateString() :
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

    _getUserInfo() {
        let postData = {};

        this.props.getUserInfoFetch(postData);
    }

    _setSafetyProblem() {
        let postData = {
            problem: this.state.problem,
            answer: this.state.answer
        };

        this.props.setSafetyProblemFetch(postData);
    }

    _setPassage() {
        let postData = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        };

        this.props.setPassageFetch(postData);
        this.setState({ isShowModal: false });
    }

    render() {
        let userInfoHeadSculpture = (this.state.headSculpture === null || this.state.headSculpture === "" || this.state.headSculpture == undefined) ? imgAvatar : this.state.headSculpture;
        return (
            <div className="hide-scroll">
                <div>
                    <div className="account-security mb-3">
                        <div className="d-flex w-100 bg-white">
                            <div className="card border-0 userinfo-introduce w-25">
                                <Card
                                    hoverable
                                    cover={
                                        <img className="w-100" alt={this.state.name} src={userInfoHeadSculpture} />
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
                                            prefix={<Tag icon={<UserOutlined />} color={Theme.primary}>账号</Tag>}
                                            suffix={
                                                <Button type="primary" icon={<EditOutlined />}
                                                    onClick={() => { this.setState({ isShowModal: true }) }}
                                                >
                                                    Search
                                                </Button>
                                            }
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <Input
                                            value={this.state.name}
                                            prefix={<Tag icon={<SmileOutlined />} color={Theme.primary}>昵称</Tag>}
                                            suffix={
                                                <Tooltip title="昵称">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <Input
                                            value={this.state.phone}
                                            prefix={<Tag color={Theme.primary}>手机号&#8194;</Tag>}
                                            suffix={
                                                <Tooltip title="手机号">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <Input
                                            value={this.state.emailAddress}
                                            prefix={<Tag color={Theme.primary}>邮箱号&#8194;</Tag>}
                                            suffix={
                                                <Tooltip title="邮箱号">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <Input.TextArea placeholder="输入你的个性签名" allowClear
                                            autoSize={{ minRows: 4, maxRows: 6 }}
                                            value={this.state.personSignature}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card className="w-100 mt-3" title="完善账号信息" bordered={false}>
                            <div className="col-md-9">
                                <div className="input-group mb-3">
                                    <Input
                                        value={this.state.problem}
                                        prefix={<Tag color={Theme.primary}>安全问题</Tag>}
                                        disabled={this.state.problemReadonly}
                                        suffix={
                                            <Button type="primary" icon={<EditOutlined />}
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ problemReadonly: !preState.problemReadonly }));
                                                    }
                                                }
                                            >
                                                {this.state.problemReadonly ? "编辑" : "保存"}
                                            </Button>
                                        }
                                        onChange={
                                            (event) => {
                                                this.setState({ problem: event.target.value });
                                            }
                                        }
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <Input
                                        value={this.state.answer}
                                        prefix={<Tag color={Theme.primary}>答&#12288;&#12288;案</Tag>}
                                        disabled={this.state.answerReadonly}
                                        suffix={
                                            <Button type="primary" icon={<EditOutlined />}
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ answerReadonly: !preState.answerReadonly }));
                                                    }
                                                }
                                            >
                                                {this.state.answerReadonly ? "编辑" : "保存"}
                                            </Button>
                                        }
                                        onChange={
                                            (event) => {
                                                this.setState({ answer: event.target.value });
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </Card>
                        <div className="w-100 mt-3 d-flex justify-content-end">
                            <Button onClick={this._getUserInfo} icon={<ReloadOutlined />} >取消修改</Button>
                            <Button className="mr-2 ml-2" onClick={this._setSafetyProblem} type="primary" icon={<UploadOutlined />} >提交修改</Button>
                        </div>
                        <Modal
                            title={"修改密码"}
                            visible={this.state.isShowModal}
                            onOk={this._setPassage}
                            onCancel={() => { this.setState({ isShowModal: false }) }}
                            okText="提交"
                            cancelText="取消"
                        >
                            <div className="input-group mb-3">
                                <Input.Password
                                    prefix={<Tag color={Theme.primary}>输入原密码</Tag>}
                                    value={this.state.oldPassword}
                                    onChange={(event) => {
                                        this.setState({ oldPassword: event.target.value });
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <Input.Password
                                    prefix={<Tag color={Theme.primary}>输入新密码</Tag>}
                                    value={this.state.newPassword}
                                    onChange={(event) => {
                                        this.setState({ newPassword: event.target.value });
                                    }}
                                />
                            </div>
                        </Modal>
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
        },
        setSafetyProblemFetch: (postData) => {
            dispatch(setSafetyProblemFetch(postData));
        },
        setPassageFetch: (postData) => {
            dispatch(setPassageFetch(postData));
        }
    }
}

const Contain = IERedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(AccountSecurity)

export default Contain