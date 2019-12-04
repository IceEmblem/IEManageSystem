import React from 'react'
import {BaseContainerComponent} from '../BaseContainerComponent'

import './Container.css'


class Container extends BaseContainerComponent
{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className="containercss">{this.props.children}</div>);
    }
}

Container.defaultProps = {
};

export default Container;