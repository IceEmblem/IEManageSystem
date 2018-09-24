import React from 'react';
import ReactDOM from 'react-dom';

export default class BodyDiv extends React.Component
{
	// setLeftMenuHeight(){
	//     var winheight = $(window).height() - 50 +"px";
	//     $(".leftmenu_css").css("height",winheight);
	// }

 //    // 组件更新时
 //    componentDidUpdate(){
 //        this.setLeftMenuHeight();
 //    }

 //    // 组件挂载时
 //    componentDidMount (){
 //        this.setLeftMenuHeight();
 //    }

    // 服务单击
    testServiceClick(e){
        var url = $(e.target).attr("data-url");
        $.get(url,function(data,status){
            $("#servicecontainer").html(data);
        });
    }

    render(){
        let selectMenuItems = this.props.selectMenuItems;
        let lis = Array();
        if(selectMenuItems!=null){
            for(let item in selectMenuItems){
                let li = 
                    <li 
                        data-url={selectMenuItems[item].url} 
                        onClick={this.testServiceClick} 
                        className="leftmenu_css_li"
                    >
                            {selectMenuItems[item].displayName}
                    </li>;

                lis.push(li);
            }
        }

        return(
                <div className="container-fixed bodydiv_css">
                    <div className="row h-100">
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