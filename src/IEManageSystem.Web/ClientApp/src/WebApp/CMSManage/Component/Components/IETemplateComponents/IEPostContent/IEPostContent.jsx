import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPostContent/IComponent'

class IEPostContent extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let text = this.props.pageData.content || '<div class="ant-skeleton"><div class="ant-skeleton-content"><h3 class="ant-skeleton-title" style="width: 38%;"></h3><ul class="ant-skeleton-paragraph"><li></li><li></li><li style="width: 61%;"></li></ul></div></div>';

        return (<div dangerouslySetInnerHTML={{ __html: text }}></div>);
    }
}

IEPostContent.defaultProps = {
};

export default (register) => register(IComponent, IEPostContent);
