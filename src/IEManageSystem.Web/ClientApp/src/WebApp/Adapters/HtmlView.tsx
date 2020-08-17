import React from 'react'
import HTMLView from 'react-native-htmlview';

export default class IEHTMLView extends React.Component<any>{
    render(){
        return <div dangerouslySetInnerHTML={{__html: this.props.value}}></div>
    }
}