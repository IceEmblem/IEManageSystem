import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {setLeftMenuHeight,testServiceClickFun,logoutClickFun} from './UserHomeJq'


class UserHome extends React.Component{
    constructor(props) {
        super(props);
        this.serviceListInfoClick = this.serviceListInfoClick.bind(this);
        

        this.getServiceInfoListInfoBackcall = this.getServiceInfoListInfoBackcall.bind(this);
        this.serviceListInfoClickBackCall = this.serviceListInfoClickBackCall.bind(this);
        this.getUserNameBackCall = this.getUserNameBackCall.bind(this);

        this.state = {bodyShowState: null,ServiceInfoList: null,UserName:null,ServiceInfoListInfo:null};

        this.getServiceInfoListInfo();
        //this.serviceListInfoClick();
        this.getUserName();
    }

    getServiceInfoListInfoBackcall(data){
        if(data.IsSuccess == true){
            let name;
            let url;
            for(let item in data.Value){
                name = data.Value[item].ServiceListID;
                url = data.Value[item].ServiceListUrl;

                break;
            }

            this.setState({ServiceInfoListInfo:data.Value},function(){
                this.setState({bodyShowState:name});
            });
            $.get(url,this.serviceListInfoClickBackCall);
        }
    }
    getServiceInfoListInfo(){
        $.get("/api/AdminiHome/GetServiceListInfoList",this.getServiceInfoListInfoBackcall);
    }


    serviceListInfoClickBackCall(data){
        if(data.IsSuccess == true){
            this.setState({ServiceInfoList:data.Value});
        }
    }
    serviceListInfoClick(e){
        let name = $(e.target).parent().attr("name");
        this.setState({bodyShowState:name});
        let url = $(e.target).parent().attr("data-url");
        $.get(url,this.serviceListInfoClickBackCall);
    }


    getUserNameBackCall(data){
        if(data.IsSuccess == true){
            this.setState({UserName:data.Value});
        }
    }
    getUserName(){
        $.get("/api/AdminiHome/GetUserName",this.getUserNameBackCall);
    }
    

    render(){
        return (
        <div>
            <Nav bodyShowState={this.state.bodyShowState} serviceListInfoClick={this.serviceListInfoClick} userName={this.state.UserName} ServiceInfoListInfo={this.state.ServiceInfoListInfo} />
            <BodyDiv ServiceInfoList={this.state.ServiceInfoList} />
        </div>
        );
    }
}

class Nav extends React.Component{
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
        logoutClickFun(e);
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
class BodyDiv extends React.Component{
    componentDidUpdate(){
        setLeftMenuHeight();
    }
    componentDidMount (){
        setLeftMenuHeight();
    }
    testServiceClick(e){
        testServiceClickFun(e);
    }
    render(){
        let letServiceInfoList = this.props.ServiceInfoList;
        let lis = Array();
        if(letServiceInfoList!=null){
            for(let item in letServiceInfoList){
                let li = <li data-url={letServiceInfoList[item].ViewUrl} onClick={this.testServiceClick} className="leftmenu_css_li">{letServiceInfoList[item].ServiceName}</li>;

                lis.push(li);
            }
        }

        return(
                <div className="container-fixed bodydiv_css">
                    <div className="row">
                        <div className="col-md-2 leftmenu_css">
                            <ul className="list-group">
                                {lis}
                            </ul>
                        </div>
                        <div id="servicecontainer" className="col-md-10"></div>
                    </div>
                </div>
        );
    }
}
ReactDOM.render( 
    <UserHome /> , 
    document.getElementById('UserHome') );