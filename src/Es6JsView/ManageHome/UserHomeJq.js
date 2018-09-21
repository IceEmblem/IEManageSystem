import $ from 'jquery';

export function setLeftMenuHeight(){
    var winheight = $(window).height() - 50 +"px";
    $(".leftmenu_css").css("height",winheight);
 }

 export function testServiceClickFun(e){
 	var url = $(e.target).attr("data-url");
 	 $.get(url,function(data,status){
	    $("#servicecontainer").html(data);
	 });
 }

 export function logoutClickFun(e){
 	var url = $(e.target).attr("data-url");
 	 $.get(url,function(data,status){
	    if(data.IsSuccess==true){
	    	window.location.href=data.RedirectHref;
	    }
	});
 }
