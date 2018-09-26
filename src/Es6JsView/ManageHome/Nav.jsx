import React from 'react';
import ReactDOM from 'react-dom';

export default class Nav extends React.Component
{
    // 组件更新时
    componentDidUpdate(){
        $(".navbar_css li").removeClass("navbar_css_li_click");
        let name="li[name="+this.props.selectMenuName+"]";
        $(name).addClass("navbar_css_li_click");
    }

    // 组件挂载时
    componentDidMount (){
        $(".navbar_css li").removeClass("navbar_css_li_click");
        let name="li[name="+this.props.selectMenuName+"]";
        $(name).addClass("navbar_css_li_click");
    }

    // 退出登录单击
    logoutClick(e){
        var url = $(e.target).attr("data-url");

        $.get(url,
            function(data)
            {
                if(data.isSuccess==true){
                    window.location.href=data.redirectHref;
                }
            }
        );
    }
    
    render(){
        let menus = this.props.menus;
        let serviceInfoList = new Array();
        if(menus != null){
            for(let item in menus){
                let li = 
                    <li 
                        name={menus[item].name} 
                        onClick={this.props.selectMenuItemsClick} 
                        className="nav-item"
                    >
                        <a className="nav-link" href="#">
                            {menus[item].displayName}
                        </a>
                    </li>;

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