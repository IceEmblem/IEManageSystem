import React from 'react'

export class BaseComponentProps{
    constructor(){
        this.pageComponentSettings = []
        // 执行逻辑 (requestData) => Promise;
        this.execLogic = (requestData)=>{};
    }
}

export default class BaseComponent extends React.Component {
}