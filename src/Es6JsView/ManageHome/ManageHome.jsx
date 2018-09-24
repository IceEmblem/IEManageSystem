import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';
import BodyDiv from './BodyDiv.jsx';


class UserHome extends React.Component{
    constructor(props) {
        super(props);

        this.selectMenuItemsClick = this.selectMenuItemsClick.bind(this);

        this.getNavigationForNameCall = this.getNavigationForNameCall.bind(this);

        this.getUserNameBackCall = this.getUserNameBackCall.bind(this);

        this.state = 
        {
            manageHomeMenu: null,          // 管理中心菜单
            selectMenuName: null,        // 当前显示的服务列表的菜单名称
            selectMenuItems:null,            // 当前显示的服务列表
            userName:null,              // 用户名称
        };

        this.getNavigationForName();

        this.getUserName();
    }

    // 获取导航回调
    getNavigationForNameCall(data){
        if(data.isSuccess == true)
        {
            if(data.value.items.length > 0)
            {
                this.setState(
                    {
                        manageHomeMenu:data.value,
                        selectMenuName:data.value.items[0].name,
                        selectMenuItems:data.value.items[0].items,
                    }
                );
            }
        }
    }
    
    // 获取导航
    getNavigationForName()
    {
        let navName = $("#NavName").attr("value");
        let url = "/api/Navigation/GetNavigationForName/?NavigationName=" + navName;
        $.get(url, this.getNavigationForNameCall);
    }

    // 服务单击事件
    selectMenuItemsClick(e){
        let name = $(e.target).parent().attr("name");
        
        let selectMenuItems = null;
        for(var item in this.state.manageHomeMenu.items){
            if(this.state.manageHomeMenu.items[item].name == name){
                selectMenuItems = this.state.manageHomeMenu.items[item].items;
                break;
            }
        }

        this.setState(
            {
                selectMenuName:name,
                selectMenuItems:selectMenuItems,
            }
        );
    }

    // 获取用户名称回调
    getUserNameBackCall(data){
        if(data.isSuccess == true){
            this.setState({userName:data.value.identityUser.name});
        }
    }

    // 获取用户名称
    getUserName(){
        $.get("/api/User/GetIdentity",this.getUserNameBackCall);
    }
    

    render(){
        let menuList = null;
        if(this.state.manageHomeMenu != null){
            menuList = this.state.manageHomeMenu.items;
        }

        return (
        <div className="d-flex h-100">
            <Nav 
                selectMenuName={this.state.selectMenuName} 
                selectMenuItemsClick={this.selectMenuItemsClick} 
                userName={this.state.userName} 
                menus={menuList} 
            />
            <BodyDiv selectMenuItems={this.state.selectMenuItems} />
        </div>
        );
    }
}

ReactDOM.render( 
    <UserHome /> , 
    document.getElementById('UserHome') );