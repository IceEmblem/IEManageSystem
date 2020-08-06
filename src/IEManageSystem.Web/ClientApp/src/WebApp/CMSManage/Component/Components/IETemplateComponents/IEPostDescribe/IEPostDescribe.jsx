import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPostDescribe/IComponent'
import IocContainer from 'Core/IocContainer';

class IEPostDescribe extends IComponent {
    render() {
        let title = this.props.pageData.describe || "这里是文章的简短描述";

        return (<p className="mb-0">{title}</p>);
    }
}

IocContainer.registerSingleIntances(IComponent, IEPostDescribe);
