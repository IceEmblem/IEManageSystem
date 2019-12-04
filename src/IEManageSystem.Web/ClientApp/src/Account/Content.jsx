import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ieReduxFetch } from 'Core/IEReduxFetch'
import { clearError } from 'Core/IEReduxs/Actions'

const LoginPanelState = {
	Login: "l",
	Register: "R"
};

function GetUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

class Content extends React.Component {
	constructor(props) {
		super(props);

		this.toLogin = this.toLogin.bind(this);
		this.toRegister = this.toRegister.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);

		this.state = {
			message: "",
			LoginPanelState: LoginPanelState.Login,
			AccountIDL: "",
			PasswordL: "",
			AccountIDR: "",
			PasswordR: "",
			PasswordRC: "",
		}
	}

	// 去登录
	toLogin() {
		this.setState({ LoginPanelState: LoginPanelState.Login });
	}

	// 去注册
	toRegister() {
		this.setState({ LoginPanelState: LoginPanelState.Register });
	}

	// 登录
	login() {
		let returnUrl = GetUrlParam("returnUrl");

		let postdata = {
			AccountID: this.state.AccountIDL,
			Password: this.state.PasswordL,
			RememberLogin: false,
			ReturnUrl: returnUrl
		};

		ieReduxFetch("/api/Account/LoginAsync", postdata)
			.then(result => {
				IETool.setToken(result.access_token);

				// 跳转管理中心
				this.props.history.push("/ManageHome/Index");
			})
	}

	// 注册
	register() {
		let PasswordR = this.state.PasswordR;
		let PasswordRC = this.state.PasswordRC;
		if (PasswordR != PasswordRC) {
			this.setState({message:"密码不一致"});
			setTimeout(()=>{ this.setState({message:""}); }, 3000);
			return false;
		}

		let postdata = {
			Password: $("#PasswordR").val(),
			AccountID: $("#AccountIDR").val(),
		};

		ieReduxFetch("/api/Account/RegisterAsync", postdata)
			.then(result => {
				this.setState({message:"注册成功，3秒后刷新页面"});
				setTimeout('location.reload()', 3000);
			})
	}

	render() {
		let inputKey = 0;
		let form;

		if(this.props.isSuccess == false){
			setTimeout(this.props.clearError, 3000);
		}

		if (this.state.LoginPanelState === LoginPanelState.Login) {
			form = <form id="loginform" className="form-inline">
				<h6>继续你的旅行...</h6>
				<div className="w-100">
					<label className="" for="text">
						用户名
					<span className="oi oi-person ml-2"></span>
					</label>
					<input key={inputKey++} value={this.state.AccountIDL} onChange={(event) => this.setState({ AccountIDL: event.target.value })} type="text" className="form-control" id="AccountIDL" name="AccountID" />
				</div>
				<div className="w-100">
					<label className="" for="pwd">
						密&#12288;码
					<span className="oi oi-key ml-2"></span>
					</label>
					<input key={inputKey++} value={this.state.PasswordL} onChange={(event) => this.setState({ PasswordL: event.target.value })} type="password" className="form-control" id="PasswordL" name="Password" />
				</div>
				<div className="w-100">
					<label className="" for="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#12288;</label>
					<input key={inputKey++} className="form-check-input" type="checkbox" />
					<label className="form-check-label">记住我</label>
				</div>
				<div className="w-100">
					<button onClick={this.login} type="button" className="btn btn-info mr-2">
						登录
					<span className="oi oi-account-login ml-2"></span>
					</button>
					<button onClick={this.toRegister} type="button" className="btn btn-primary">去注册</button>
				</div>
			</form>;
		}
		else {
			form = <form id="registerform" className="form-inline">
				<h6>开始你的旅行...</h6>
				<div className="w-100">
					<label className="" for="text">
						用户名
					<span className="oi oi-person ml-2"></span>
					</label>
					<input key={inputKey++} value={this.state.AccountIDR} onChange={(event) => this.setState({ AccountIDR: event.target.value })} type="text" className="form-control w-75" id="AccountIDR" name="AccountID" />
				</div>
				<div className="w-100">
					<label className="" for="pwd">
						密&#12288;码
					<span className="oi oi-key ml-2"></span>
					</label>
					<input key={inputKey++} value={this.state.PasswordR} onChange={(event) => this.setState({ PasswordR: event.target.value })} className="form-control w-50" id="PasswordR" name="Password" type="password" />
				</div>
				<div className="w-100">
					<label className="" for="pwd">
						确&#12288;认
					<span className="oi oi-check ml-2"></span>
					</label>
					<input key={inputKey++} value={this.state.PasswordRC} onChange={(event) => this.setState({ PasswordRC: event.target.value })} className="form-control w-50" id="PasswordRC" name="PasswordC" type="password" />
				</div>
				<div className="w-100">
					<button onClick={this.register} type="button" className="btn btn-primary mr-2">
						注册
					<span className="oi oi-account-login ml-2"></span>
					</button>
					<button onClick={this.toLogin} type="button" className="btn btn-info">去登录</button>
				</div>
			</form>;
		}

		return (
			<div className="col-md-4">
				<div className="col-md-12">
					<div className="col-md-12 error text-danger">
						{this.props.isSuccess == false && this.props.error}
						{this.state.message}
					</div>
					<div>
						{form}
					</div>
				</div>
			</div>
		);
	}
}

Content.propTypes = {
	isSuccess: PropTypes.bool,
	error: PropTypes.string
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
	return {
		isSuccess: state.fecth.isSuccess,
		error: state.fecth.error
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		clearError: () => { dispatch(clearError()) }
	}
}

const Contain = connect(
	mapStateToProps, // 关于state
	mapDispatchToProps // 关于dispatch
)(withRouter(Content))

export default Contain