import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPostDescribe/IComponent'

class IEPostDescribe extends IComponent {
    render() {
        let title = this.props.pageData.describe || "这里是文章的简短描述";

        return (<p className="mb-0">{title}</p>);
    }
}

export default (register) => register(IComponent, IEPostDescribe);
