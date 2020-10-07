import React from 'react'
import IComponent from 'IETemplateComponents/IEAudio/IComponent'

class Component extends IComponent {
    componentDidMount() {
    }

    render() {
        return <audio className='w-100' controls>
            <source src={this.getUrl()} type="audio/mpeg" />
            您的浏览器不支持 audio 元素。
      </audio>
    }
}

export default Component;
