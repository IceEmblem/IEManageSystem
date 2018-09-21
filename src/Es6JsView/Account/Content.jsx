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

export default class Content extends React.Component{
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
	toLogin(){
		this.setState({ LoginPanelState:LoginPanelState.Login });
	}
	toRegister(){
		this.setState({ LoginPanelState:LoginPanelState.Register });
	}
	login(){
		// let form = new FormData();
		// form.append("username", this.state.AccountIDL);
		// form.append("password", this.state.PasswordL);
		// form.append("VaildCode", this.state.VaildCodeL);
		// form.append("grant_type", "password");
		// form.append("client_id", "IEClient");
		// form.append("client_secret", "secret");

		// let settings = 
		// {
		//   	"async": true,
		// 	"crossDomain": true,
		// 	"url": "/connect/token",
		// 	"method": "POST",
		// 	"headers": {
		// 		"Cache-Control": "no-cache",
		// 		"Postman-Token": "f55b3ba4-781d-4b93-a1af-309a267cd8fb"
		// 	},
		// 	"processData": false,
		// 	"contentType": false,
		// 	"mimeType": "multipart/form-data",
		// 	"data": form,
		// 	"success":function(data){
		// 		console.log(data);
		// 		let response = JSON.parse(data);
		// 		$.cookie("token",response.access_token);
		// 		// 测试
		// 		$.ajax({
		// 		    headers: {
		// 		        //Bearer是我的项目需要的,你可以按你的需求规范格式
		// 		        'Authorization':'Bearer '+ $.cookie("token"),
		// 		    },
		// 		    type: 'GET',
		// 		    dataType: "json",
		// 		    url: "/api/Account/TestAsync",
		// 		    error: function(testdata) {
		// 		    	console.log(testdata);
		// 		    },
		// 		    success: function(testdata) {
		// 		    	console.log(testdata);
		// 		    }
		// 		});
		// 	},
		// 	"error":function(data)
		// 	{
		// 		let responseText = data.responseText;
		// 		let response = JSON.parse(responseText);
		// 		$("div.error").eq(0).text(response.error_description);
		// 		setTimeout('$("div.error").eq(0).text("")',3000);
		// 	}
		// }

		// $.ajax(settings);
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
                success: function(data) {
					if(data.isSuccess==true){
						console.log("登录成功");
						$(location).attr('href', data.redirectHref);
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