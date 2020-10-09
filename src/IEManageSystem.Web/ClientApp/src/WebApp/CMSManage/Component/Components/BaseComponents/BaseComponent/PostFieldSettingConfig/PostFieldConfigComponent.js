import React from 'react'
import Theme from 'BaseLayout/Theme'
import { IPostFieldConfigComponent } from 'BaseCMSManage/Components/BaseComponents/BaseComponent/PostFieldSettingConfig'
import Setting from 'BaseCMSManage/Components/BaseComponents/BaseComponent/PostFieldSettingConfig/Setting'

import { Radio, Typography, Tag } from 'antd';
import IocContainer from 'Core/IocContainer';

export default class PostFieldConfigComponent extends IPostFieldConfigComponent {
    render() {
        let setting = new Setting(this.props.data);

        return <div className="d-flex flex-md-wrap">
            <div className="mb-3">选择组件所需数据对应的文章字段</div>
            {
                this.props.configs.map(item => {
                    return <div className="w-100 mb-3">
                        <Tag color={Theme.primary}>{item.displayName}</Tag>
                        <Radio.Group
                            onChange={(e) => {
                                setting.setPostFieldName(item.fieldName, e.target.value);
                                this.setState({})
                            }}
                            value={setting.getPostFieldName(item.fieldName)}
                        >
                            <Radio value="">不使用</Radio>
                            <Radio value="field1">文章字段1</Radio>
                            <Radio value="field2">文章字段2</Radio>
                            <Radio value="field3">文章字段3</Radio>
                            <Radio value="field4">文章字段4</Radio>
                            <Radio value="field5">文章字段5</Radio>
                        </Radio.Group>
                    </div>
                })
            }
        </div>
    }
}

IocContainer.registerSingleIntances(IPostFieldConfigComponent, PostFieldConfigComponent);