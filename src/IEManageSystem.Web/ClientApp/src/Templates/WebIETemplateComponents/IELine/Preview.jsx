import React from 'react'
import PreviewImg from 'IETemplateComponents/IELine/Preview.png'

class Preview extends React.Component{
    render(){
        return <div><img width="100%" height="100%" src={PreviewImg} alt="IE-折线|柱状|条形"/></div>
    }
}

export default Preview;