import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render( 
    <UserHome /> , 
    document.getElementById('UserHome') );