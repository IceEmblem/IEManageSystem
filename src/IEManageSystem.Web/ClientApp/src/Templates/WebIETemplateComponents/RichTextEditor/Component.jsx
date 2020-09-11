import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import './RichTextEditor.css'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    getComponentData() {
        return this.props.componentData || {};
    }

    render() {
        let text = this.props.componentData.getDefauleData().field1 || '<div class="ant-skeleton"><div class="ant-skeleton-content"><h3 class="ant-skeleton-title" style="width: 38%;"></h3><ul class="ant-skeleton-paragraph"><li></li><li></li><li style="width: 61%;"></li></ul></div></div>';

        return (<div dangerouslySetInnerHTML={{ __html: text }}></div>);
    }
}

export default Component;
