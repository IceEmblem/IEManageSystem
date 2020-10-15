import React from 'react'
import IComponent from 'IETemplateComponents/IEAudio/IComponent'

class Component extends IComponent {
    componentDidMount() {
    }

    render() {
        let src = this.getUrl();

        return <audio className='w-100' controls>
            {
                src &&
                <>
                    <source src={src} type="audio/mpeg" />
                    您的浏览器不支持 audio 元素。
                </>
            }
        </audio>
    }
}

export default Component;
