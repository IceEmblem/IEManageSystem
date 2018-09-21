import React from 'react';
import ReactDOM from 'react-dom';
import {setLeftMenuHeight,testServiceClickFun,logoutClickFun} from './UserHomeJq'

class BodyDiv extends React.Component
{
	setLeftMenuHeight(){
	    var winheight = $(window).height() - 50 +"px";
	    $(".leftmenu_css").css("height",winheight);
	}
	testServiceClickFun(e){
	 	var url = $(e.target).attr("data-url");
	 	 $.get(url,function(data,status){
		    $("#servicecontainer").html(data);
		 });
	 }
    componentDidUpdate(){
        this.setLeftMenuHeight();
    }
    componentDidMount (){
        this.setLeftMenuHeight();
    }
    testServiceClick(e){
        this.testServiceClickFun(e);
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