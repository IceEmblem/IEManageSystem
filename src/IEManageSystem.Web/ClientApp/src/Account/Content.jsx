import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { ieReduxFetch } from 'Core/IEReduxFetch'
import IEToken from 'Core/IEToken'

import { Input, Checkbox, Button, notification } from 'antd';
import { KeyOutlined, UserOutlined, LoginOutlined, SwapRightOutlined } from '@ant-design/icons';

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
				IEToken.setToken(result.access_token);

				// 跳转管理中心
				this.props.history.push("/ManageHome/Index");
			})
	}

	// 注册
	register() {
		let PasswordR = this.state.PasswordR;
		let PasswordRC = this.state.PasswordRC;
		if (PasswordR != PasswordRC) {
			notification.error({
				message: '验证失败',
				description: '两次密码输入不一致',
			})
			return false;
		}

		let postdata = {
			Password: this.state.PasswordR,
			AccountID: this.state.AccountIDR,
		};

		ieReduxFetch("/api/Account/RegisterAsync", postdata)
			.then(result => {
				notification.success({
					message: '注册成功',
					description: '注册成功，3秒后刷新页面',
				})
				setTimeout('location.reload()', 3000);
			})
	}

	render() {
		return (
			<div className="col-md-4">
				<div className="col-md-12">
					<div className="w-75">
						<div className="">
							<h6 className="text-white mb-3">
								{
									this.state.LoginPanelState == LoginPanelState.Login ?
										"继续你的旅行..." :
										"开始你的旅行"
								}
							</h6>
							<div className="mb-3">
								<Input
									prefix={<span className="text-white">用户名 <UserOutlined /></span>}
									style={{ backgroundColor: "#fff5", border: "0px" }}
									value={
										this.state.LoginPanelState == LoginPanelState.Login ?
											this.state.AccountIDL :
											this.state.AccountIDR
									}
									onChange={(event) => {
										if (this.state.LoginPanelState == LoginPanelState.Login) {
											this.setState({ AccountIDL: event.target.value })
										}
										else {
											this.setState({ AccountIDR: event.target.value })
										}
									}}
								/>
							</div>
							<div className="mb-3">
								<Input.Password
									prefix={<span className="text-white">密&#12288;码 <KeyOutlined /></span>}
									style={{ backgroundColor: "#fff5", border: "0px" }}
									value={
										this.state.LoginPanelState == LoginPanelState.Login ?
											this.state.PasswordL :
											this.state.PasswordR
									}
									onChange={(event) => {
										if (this.state.LoginPanelState == LoginPanelState.Login)
											this.setState({ PasswordL: event.target.value })
										else
											this.setState({ PasswordR: event.target.value })
									}}
								/>
							</div>
							{
								this.state.LoginPanelState == LoginPanelState.Login ?
									(
										<div className="mb-3">
											<Checkbox className="text-white" onChange={(e) => { }}>记住我</Checkbox>
										</div>
									) :
									(
										<div className="mb-3">
											<Input.Password
												style={{ backgroundColor: "#fff5", border: "0px" }}
												prefix={<span className="text-white">确&#12288;认 <KeyOutlined /></span>}
												value={this.state.PasswordRC}
												onChange={(event) => this.setState({ PasswordRC: event.target.value })}
											/>
										</div>
									)
							}
							<div className="">
								<Button
									icon={<LoginOutlined />}
									type="primary"
									onClick={this.state.LoginPanelState == LoginPanelState.Login ? this.login : this.register} >
									{this.state.LoginPanelState == LoginPanelState.Login ? "登录" : "注册"}
								</Button>
								<Button
									className="ml-3 text-white"
									icon={<SwapRightOutlined />}
									type="ghost"
									shape="round"
									onClick={this.state.LoginPanelState == LoginPanelState.Login ? this.toRegister : this.toLogin} >
									{this.state.LoginPanelState == LoginPanelState.Login ? "去注册" : "去登录"}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Content.propTypes = {
}

export default withRouter(Content)