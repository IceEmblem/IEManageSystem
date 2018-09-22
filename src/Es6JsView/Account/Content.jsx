import React from 'react';

const LoginPanelState = {
	Login:"l",
	Register:"R"
};

function GetUrlParam(name)
{
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

export default class Content extends React.Component
{
	constructor(props){
		super(props);
		
		this.toLogin = this.toLogin.bind(this);
		this.toRegister = this.toRegister.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);

		this.imgClick = this.imgClick.bind(this);
		let imgsrc = "/Api/Account/GetVerificationCode/?date=" + new Date();

		this.state = { 
			LoginPanelState:LoginPanelState.Login, 
			imgSrc:imgsrc,
			AccountIDL:"", 
			PasswordL:"",
			VaildCodeL:"",
			EmailR:"",
			AccountIDR:"",
			PasswordR:"",
			PasswordRC:"",
			VaildCodeR:""
		}
	}

	// 去登录
	toLogin(){
		this.setState({ LoginPanelState:LoginPanelState.Login });
	}

	// 去注册
	toRegister(){
		this.setState({ LoginPanelState:LoginPanelState.Register });
	}
	
	// 登录回调
	loginCall(data){
		if(data.isSuccess==true)
		{
			if( data.redirectHref == null || data.redirectHref == "")
			{
				// 跳转管理中心
				let manageHomeUrl = $("#manageHomeUrl").attr("value");
				$(location).attr('href', manageHomeUrl);
			}
			else{
				$(location).attr('href', data.redirectHref);
			}
		}
		else{
			$("div.error").eq(0).text(data.message);
			setTimeout('$("div.error").eq(0).text("")',3000);
		}
	}

	// 登录
	login(){
		let returnUrl = GetUrlParam("returnUrl");

		let postdata = {
			AccountID:this.state.AccountIDL,
			Password:this.state.PasswordL,
			VaildCode:this.state.VaildCodeL,
			RememberLogin:false,
			ReturnUrl:returnUrl
		};

		$.ajax({
                url: "/api/Account/LoginAsync",
                type: "post",
                contentType: "application/json-patch+json",
                dataType: "json",
                data: JSON.stringify(postdata),
                success: this.loginCall,
				error: function(data)
				{
					console.log(data.responseText);
				}
            });
	}

	// 注册
	register(){
		let PasswordR = this.state.PasswordR;
		let PasswordRC = this.state.PasswordRC;
		if(PasswordR != PasswordRC){
			$("div.error").eq(0).text("密码不一致");
			return false;
		}

		let postdata = {
			Email:$("#EmailR").val(),
			Password:$("#PasswordR").val(),
			AccountID:$("#AccountIDR").val(),
			VaildCode:$("#VaildCodeR").val()
		};
		
		$.ajax({
                url: "/api/Account/RegisterAsync",
                type: "post",
                contentType: "application/json-patch+json",
                dataType: "json",
                data: JSON.stringify(postdata),
                success: function(data) {
					if(data.isSuccess==true){
						$("div.error").eq(0).text("注册成功，3秒后刷新页面");
						setTimeout('location.reload()',3000);
					}
					else{
						$("div.error").eq(0).text(data.message);
						setTimeout('$("div.error").eq(0).text("")',3000);
					}
		    	},
				error: function(data)
				{
					console.log(data.responseText);
				}
            });
	}

	// 验证图片
	imgClick(){
			let imgsrc = "/Api/Account/GetVerificationCode/?date=" + new Date();
			this.setState({imgSrc:imgsrc});
	}

	render(){
		if(this.state.LoginPanelState == LoginPanelState.Login){
			return(
				<div className="col-md-4">
					<div className="col-md-12">
						<div className="col-md-12 error text-danger"></div>
						<div>
							<form id="loginform" className="form-inline">
								<h6>继续你的旅行...</h6>
							  <div className="w-100">
							    <label className="" for="text">用户名:</label>
							    <input  value={this.state.AccountIDL} onChange={(event)=> this.setState({AccountIDL: event.target.value})}  type="text" className="form-control" id="AccountIDL" name="AccountID" />
							  </div>
							  <div className="w-100">
							    <label className="" for="pwd">密&#12288;码:</label>
							    <input value={this.state.PasswordL} onChange={(event)=> this.setState({PasswordL: event.target.value})}  type="password" className="form-control" id="PasswordL" name="Password" />
							  </div>
							  <div className="w-100 valid">
							    <label className="" for="text">验证码:</label>
							    <input value={this.state.VaildCodeL} onChange={(event)=> this.setState({VaildCodeL: event.target.value})} type="text" className="" id="VaildCodeL" name="VaildCode" />
							    <img onClick={this.imgClick} src={this.state.imgSrc}  className="img-rounded" />
							  </div>
							  <div className="w-100">
							  	<label className="" for="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
							    <input className="form-check-input" type="checkbox" />
							    <label className="form-check-label">记住我</label>
							  </div>
							  <div className="w-100">
							  	&#12288;&#12288;&#12288;
							    <button onClick={this.login} type="button" className="btn btn-info">登录</button>
							  	<button onClick={this.toRegister} type="button" className="btn btn-primary">去注册</button>
							  </div>
							</form>
						</div>
					</div>
				</div>
			);
		}
		else{
			return(
				<div className="col-md-4">
					<div className="col-md-12">
						<div className="col-md-12 error text-danger"></div>
						<div>
							<form id="registerform" className="form-inline">
							  <h6>开始你的旅行...</h6>
							  <div className="w-100">
							    <label className="" for="text">邮&#12288;箱:</label>
							    <input value={this.state.EmailR} onChange={(event)=> this.setState({EmailR: event.target.value})} type="text" className="form-control w-75" id="EmailR" name="Email" />
							  </div>
							  <div className="w-100">
							    <label className="" for="text">用户名:</label>
							    <input value={this.state.AccountIDR} onChange={(event)=> this.setState({AccountIDR: event.target.value})} type="text" className="form-control w-75" id="AccountIDR" name="AccountID" />
							  </div>
							  <div className="w-100">
							    <label className="" for="pwd">密&#12288;码:</label>
							    <input value={this.state.PasswordR} onChange={(event)=> this.setState({PasswordR: event.target.value})}  className="form-control w-50" id="PasswordR" name="Password" type="password" />
							  </div>
							  <div className="w-100">
							    <label className="" for="pwd">确&#12288;认:</label>
							    <input value={this.state.PasswordRC} onChange={(event)=> this.setState({PasswordRC: event.target.value})} className="form-control w-50" id="PasswordRC" name="PasswordC" type="password" />
							  </div>
							  <div className="w-100 valid">
							    <label className="" for="pwd">验证码:</label>
							    <input value={this.state.VaildCodeR} onChange={(event)=> this.setState({VaildCodeR: event.target.value})} type="text" className="" id="VaildCodeR" name="VaildCode" />
							    <img onClick={this.imgClick} src={this.state.imgSrc}  className="img-rounded" />
							  </div>
							  <div className="w-100">
							  	&#12288;&#12288;&#12288;
							  	<button onClick={this.register} type="button" className="btn btn-primary">注册</button>
							    <button onClick={this.toLogin} type="button" className="btn btn-info">去登录</button>
							  </div>
							</form>
						</div>
					</div>
				</div>
			);
		}
	}
}