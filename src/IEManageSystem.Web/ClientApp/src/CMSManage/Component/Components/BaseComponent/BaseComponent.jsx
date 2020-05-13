import React from 'react'

export class BaseComponentProps{
    constructor(){
        this.pageComponentSettings = []
        // 执行逻辑 (requestData) => Promise;
        this.execLogic;
    }
}

export default class BaseComponent extends React.Component {
}