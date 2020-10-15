import React from 'react'
import previewImg from './preview.png'

class Preview extends React.Component{
    render(){
        return <img style={{width: '100%'}} src={previewImg} />
    }
}

export default Preview;