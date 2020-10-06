import React from 'react'
import IComponent from 'IETemplateComponents/RichTextEditor/IComponent'
import './RichTextEditor.css'

class Component extends IComponent {
    render() {
        let text = this.getText();

        return (<div style={this.baseStyle} dangerouslySetInnerHTML={{ __html: text }}></div>);
    }
}

export default Component;
