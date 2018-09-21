import React from 'react';
import ReactDOM from 'react-dom';

function GetUrlParam(name)
{
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

export default class Authority extends React.Component{
	constructor(props){
		super(props);
		
		this.scopes = new Array();
		this.state = {
			authorityInfo:null,
		};

		this.GetConsentCall = this.GetConsentCall.bind(this);
		this.AgreeClick = this.AgreeClick.bind(this);
		this.RefuseClick = this.RefuseClick.bind(this);
		this.GetConsent();
	}
	
	// 获取授权项回调
	GetConsentCall(data){
		if(data.isSuccess == true){
			this.setState({ authorityInfo: data.value });
		}
		else{
			let errorMessage = "发生了一个错误：" + data.message;
			$("#error").text(errorMessage);
		}
	}

	// 获取授权信息
	GetConsent(){
		let returnUrl = escape(GetUrlParam("returnUrl"));
		let url = "/Api/Consent/GetConsent/?returnUrl=" + returnUrl;

		$.get(url, this.GetConsentCall);
	}
	
	// 同意回调
	AgreeClickCall(data)
	{
		if(data.isSuccess == true){
			$(location).attr('href', data.redirectHref);
		}
		else{
			if(data.redirectHref != null){
				$(location).attr('href', data.redirectHref);
			}
			else{
				let errorMessage = "发生了一个错误：" + data.message;
				$("#error").text(errorMessage);
			}
		}
	}

	// 同意
	AgreeClick(){
		let returnUrl = GetUrlParam("returnUrl");

		let postData = {
			IsAgree:true,
			ScopesConsented:this.scopes,
			ReturnUrl:returnUrl,
		}

		$.ajax({
                url: "/api/Consent/ConsentHandle",
                type: "post",
                contentType: "application/json-patch+json",
                dataType: "json",
                data: JSON.stringify(postData),
                success: this.AgreeClickCall,
				error: function(data)
				{
					console.log(data.responseText);
				}
            });
	}
	
	// 拒绝
	RefuseClick(){
		let returnUrl = GetUrlParam("returnUrl");

		let postData = {
			IsAgree:false,
			ReturnUrl:returnUrl,
		}

		$.ajax({
                url: "/api/Consent/ConsentHandle",
                type: "post",
                contentType: "application/json-patch+json",
                dataType: "json",
                data: JSON.stringify(postData),
                success: this.AgreeClickCall,
				error: function(data)
				{
					console.log(data.responseText);
				}
            });
	}

	render()
	{
		let authorityInfo = null;

		if(this.state.authorityInfo != null){
			authorityInfo = this.state.authorityInfo;
		}
		else{
			authorityInfo = {
				clientName:"",
				clientUrl:"",
				clientLogoUrl:"",
				identityScopes:new Array(),
				resourceScopes:new Array(),
			};
		}

		let authoritylist = new Array();
		for(let item in authorityInfo.identityScopes){
			let li = <li className="list-group-item list-group-item-success">{ authorityInfo.identityScopes[item].displayName }</li>;
			this.scopes.push(authorityInfo.identityScopes[item].name);

			authoritylist.push(li);
		}
		for(let item in authorityInfo.resourceScopes){
			let li = <li className="list-group-item list-group-item-success">{ authorityInfo.resourceScopes[item].displayName }</li>;
			this.scopes.push(authorityInfo.resourceScopes[item].name);

			authoritylist.push(li);
		}

		return(<div className="col-md-8 card float-left authority">
                        <div className="card-header"> 
                        	<span>{ authorityInfo.clientName } 申请以下权限</span> 
                        	<span id="error" className="text-danger float-right"></span>
                        </div>
                        <div className="card-body">
                            <div className="col-md-12 authority-list">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <ul className="list-group">
                                      { authoritylist }
                                    </ul>
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                            <div className="col-md-12 authority-btn">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-success" onClick={this.AgreeClick} >同意并授权</button>
                                    <button type="button" className="btn btn-secondary" onClick={this.RefuseClick}>拒绝授权</button>
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div> 
                        <div className="card-footer">
                            冰纹管理系统-2018
                        </div>
                    </div>);
	}
}