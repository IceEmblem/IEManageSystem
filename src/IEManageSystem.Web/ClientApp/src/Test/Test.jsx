import React from 'react';

import PromptBox from 'PromptBox';

import "./Test.css";

export default class Test extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <PromptBox>简单的卡片</PromptBox>
            </div>
        );
    }
}