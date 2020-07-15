import React from 'react'

export class BaseComponentProps{
    constructor(){
        this.pageComponent = null;
        this.pageComponentSettings = []
        // 执行逻辑 (requestData) => Promise;
        this.execLogic = (requestData)=>{};
        // 刷新页面
        this.pageFreshen = ()=>{};
        // 页面
        this.page = null;
        // 文章
        this.pageData = null;
    }
}

export default class BaseComponent extends React.Component {
}