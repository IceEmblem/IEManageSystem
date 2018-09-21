import React from 'react';
import ReactDOM from 'react-dom';

export default class Nav extends React.Component
{
	logoutClickFun(e){
	 	var url = $(e.target).attr("data-url");
	 	 $.get(url,function(data,status){
		    if(data.IsSuccess==true){
		    	window.location.href=data.RedirectHref;
		    }
		});
	 }
    componentDidUpdate(){
        $(".navbar_css li").removeClass("navbar_css_li_click");
        let name="li[name="+this.props.bodyShowState+"]";
        $(name).addClass("navbar_css_li_click");
    }
    componentDidMount (){
        $(".navbar_css li").removeClass("navbar_css_li_click");
        let name="li[name="+this.props.bodyShowState+"]";
        $(name).addClass("navbar_css_li_click");
    }
    logoutClick(e){
        this.logoutClickFun(e);
    }
    render(){
        let letServiceInfoListInfo = this.props.ServiceInfoListInfo;
        let serviceInfoList = new Array();
        if(letServiceInfoListInfo != null){
            for(let item in letServiceInfoListInfo){
                let li = <li name={letServiceInfoListInfo[item].ServiceListID} onClick={this.props.serviceListInfoClick} className="nav-item" data-url={letServiceInfoListInfo[item].ServiceListUrl}><a className="nav-link" href="#">{letServiceInfoListInfo[item].ServiceListName}</a></li>;

                serviceInfoList.push(li);
            }
        }

        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top navbar_css">
              <a className="navbar-brand" href="#">冰纹后台管理系统</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    {serviceInfoList}
                </ul>
                <span className="text-info float-right">你好，{this.props.userName}</span>
                <input id="outLogin" data-url="/api/Account/Logout" onClick={this.logoutClick} type="button" value="退出登录" className="btn btn-info float-right" />
              </div> 
            </nav>
        );
    }
}