import React from 'react';

import './IEBackground.css';

export default class extends React.Component{
    componentDidMount(){
        document.body.classList.add("iebackground");
    }
    componentWillUnmount(){
        document.body.classList.remove("iebackground");
    }
    render() {
        return <div></div>;
    }
}