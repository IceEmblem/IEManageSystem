import React from 'react';
import './UserInfo.css';
import imgAvatar from 'images/default_avatar.png';
import {getUserInfoFetch, setUserInfoFetch} from '../IEReduxs/Actions'
import IERedux from '../IEReduxs/PersonalRedux'
import IETool from 'ToolLibrary/IETool'

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
        $(':input:not(.labelauty)').labelauty();

        if(!this.props.userInfoData.invalidate){
            return;
        }

        this._getUserInfo();
    }

    componentWillUpdate(props){
        this.setNextStateForProps(props);
    }

    setNextStateForProps(props){
        if(!props.userInfoData.user){
            return;
        }
        
        let birthDate = props.userInfoData.user.birthDate != null ?
            (new Date(props.userInfoData.user.birthDate)).Format("yyyy-MM-dd"):
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

    componentDidUpdate() {
        $(':input:not(.labelauty)').labelauty();
    }

    _readFile(event) {
        IETool.imageToBase64String(event.target.files[0], (base64)=>{
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
                    <div className="userinfo mb-3">
                        <div className="d-flex w-100">
                            <div className="card border-right-0 w-25">
                                <div className="w-100">
                                    <div className="inputfile-img">
                                        <button className="btn text-white">修改头像</button>
                                        <input name="headSculpture" type="file" onChange={this._readFile} />
                                    </div>
                                    <img id="userInfoHeadSculpture" className="card-img-top w-100"
                                        src={userInfoHeadSculpture} alt="Card image" />
                                </div>
                                <div className="card-body">
                                    <h6 className="card-title">{this.state.name}</h6>
                                    <p className="card-text">{this.state.personSignature}</p>
                                </div>
                            </div>
                            <div className="card text-white flex-grow-1 userinfo-transparent">
                                <div className="card-body">
                                    <div className="input-group mb-3 w-75 float-left">
                                        <div className="input-group-prepend userinfo-lable">
                                            <span className="input-group-text">账号</span>
                                        </div>
                                        <input value={this.state.userName} name="userName" type="text" className="form-control" placeholder="AccountNo" readOnly="readonly"
                                            onChange={
                                                (event) => {
                                                    this.setState({ userName: event.target.value });
                                                }
                                            }
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend userinfo-lable">
                                            <span className="input-group-text">昵称</span>
                                        </div>
                                        <input value={this.state.name || ""} name="name" type="text" className="form-control" placeholder="请输入昵称"
                                            readOnly={this.state.nameReadonly}
                                            onChange={
                                                (event) => {
                                                    this.setState({ name: event.target.value });
                                                }
                                            }
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-info" type="button"
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ nameReadonly: !preState.nameReadonly }));
                                                    }
                                                }
                                            ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.nameReadonly ? "编辑" : "保存"}</button>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend userinfo-lable">
                                            <span className="input-group-text">手机号</span>
                                        </div>
                                        <input value={this.state.phone || ""} name="phone" type="text" className="form-control" placeholder="请输入手机号"
                                            readOnly={this.state.phoneReadonly}
                                            onChange={
                                                (event) => {
                                                    this.setState({ phone: event.target.value });
                                                }
                                            }
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-info" type="button"
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ phoneReadonly: !preState.phoneReadonly }));
                                                    }
                                                }
                                            ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.phoneReadonly ? "编辑" : "保存"}</button>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend userinfo-lable">
                                            <span className="input-group-text">邮箱号</span>
                                        </div>
                                        <input value={this.state.emailAddress || ""} name="emailAddress" type="text" className="form-control" placeholder="请输入电子邮箱"
                                            readOnly={this.state.emailAddressReadonly}
                                            onChange={
                                                (event) => {
                                                    this.setState({ emailAddress: event.target.value });
                                                }
                                            }
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-info" type="button"
                                                onClick={
                                                    () => {
                                                        this.setState((preState) => ({ emailAddressReadonly: !preState.emailAddressReadonly }));
                                                    }
                                                }
                                            ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.emailAddressReadonly ? "编辑" : "保存"}</button>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend userinfo-lable">
                                            <span className="input-group-text">个性签名</span>
                                        </div>
                                        <textarea className="form-control" rows="4" id="comment" placeholder="请输入个性签名"
                                            value={this.state.personSignature}
                                            onChange={
                                                (event) => {
                                                    this.setState({ personSignature: event.target.value });
                                                }
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-3">
                            <h5 className="mb-3">完善个人信息</h5>
                            <div className="col-md-9">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend userinfo-lable">
                                        <span className="input-group-text">真实姓名</span>
                                    </div>
                                    <input value={this.state.realName || ""} name="phone" type="text" className="form-control" placeholder="请输入真实姓名"
                                        readOnly={this.state.realNameReadonly}
                                        onChange={
                                            (event) => {
                                                this.setState({ realName: event.target.value });
                                            }
                                        }
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button"
                                            onClick={
                                                () => {
                                                    this.setState((preState) => ({ realNameReadonly: !preState.realNameReadonly }));
                                                }
                                            }
                                        ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.realNameReadonly ? "编辑" : "保存"}</button>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend userinfo-lable">
                                        <span className="input-group-text">身份证号</span>
                                    </div>
                                    <input value={this.state.idNumber || ""} name="phone" type="text" className="form-control" placeholder="请输入身份证号"
                                        readOnly={this.state.idNumberReadonly}
                                        onChange={
                                            (event) => {
                                                this.setState({ idNumber: event.target.value });
                                            }
                                        }
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button"
                                            onClick={
                                                () => {
                                                    this.setState((preState) => ({ idNumberReadonly: !preState.idNumberReadonly }));
                                                }
                                            }
                                        ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.idNumberReadonly ? "编辑" : "保存"}</button>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend userinfo-lable">
                                        <span className="input-group-text">地址</span>
                                    </div>
                                    <input value={this.state.address || ""} name="phone" type="text" className="form-control" placeholder="请输入地址"
                                        readOnly={this.state.addressReadonly}
                                        onChange={
                                            (event) => {
                                                this.setState({ address: event.target.value });
                                            }
                                        }
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button"
                                            onClick={
                                                () => {
                                                    this.setState((preState) => ({ addressReadonly: !preState.addressReadonly }));
                                                }
                                            }
                                        ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.addressReadonly ? "编辑" : "保存"}</button>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend userinfo-lable">
                                        <span className="input-group-text">性别</span>
                                    </div>
                                    <div className="d-flex flex-grow-1 align-items-center">
                                        <span className="ml-3 userinfo-radio">
                                            <input type="radio" name="sex" data-labelauty="男" value={true} checked={(this.state.sex === true)} onChange={() => { this.setState({ sex: true }) }} />
                                        </span>
                                        <span className="ml-3 userinfo-radio">
                                            <input type="radio" name="sex" data-labelauty="女" value={false} checked={(this.state.sex === false)} onChange={() => { this.setState({ sex: false }) }} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend userinfo-lable">
                                        <span className="input-group-text">出生日期</span>
                                    </div>
                                    <input value={this.state.birthDate} name="phone" type="date" className="form-control" placeholder="请输入出生年月日"
                                        readOnly={this.state.birthDateReadonly}
                                        onChange={
                                            (event) => {
                                                this.setState({ birthDate: event.target.value });
                                            }
                                        }
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button"
                                            onClick={
                                                () => {
                                                    this.setState((preState) => ({ birthDateReadonly: !preState.birthDateReadonly }));
                                                }
                                            }
                                        ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.birthDateReadonly ? "编辑" : "保存"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-3">
                            <button className="btn btn-info float-right" type="button" onClick={this._setUserInfo}>提交修改</button>
                            <button className="btn btn-secondary float-right mr-3" type="button" onClick={this._getUserInfo}>取消修改</button>
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