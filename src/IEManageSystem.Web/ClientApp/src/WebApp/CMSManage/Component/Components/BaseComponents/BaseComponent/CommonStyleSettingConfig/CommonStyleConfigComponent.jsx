import React from 'react'
import Theme from 'BaseLayout/Theme'
import { ICommonStyleConfigComponent } from 'BaseCMSManage/Components/BaseComponents/BaseComponent/CommonStyleSettingConfig'
import Setting from 'BaseCMSManage/Components/BaseComponents/BaseComponent/CommonStyleSettingConfig/Setting'

import { Input, Tag, message } from 'antd';
import IocContainer from 'Core/IocContainer';

export default class CommonStyleConfigComponent extends ICommonStyleConfigComponent {
    render() {
        let setting = new Setting(this.props.data);

        return <div className="d-flex flex-md-wrap">
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：50px"
                    value={setting.height}
                    onChange={
                        (event) => {
                            setting.height = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>组件高度</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：50px"
                    value={setting.width}
                    onChange={
                        (event) => {
                            setting.width = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>组件宽度</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：50px"
                    value={setting.padding}
                    onChange={
                        (event) => {
                            setting.padding = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>组件内边距</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：50px"
                    value={setting.margin}
                    onChange={
                        (event) => {
                            setting.margin = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>组件外边距</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="">自定义样式（Json 格式）</label>
                <Input.TextArea
                    placeholder='示例：{"width": "100%"}'
                    value={setting.style}
                    onChange={
                        (event) => {
                            setting.style = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    onBlur={()=>{
                        if(!setting.style){
                            return;
                        }

                        try{
                            JSON.parse(setting.style);
                        }
                        catch(ex){
                            message.error("自定义样式错误：" + ex.message);
                        }
                    }}
                />
            </div>
        </div>
    }
}

IocContainer.registerSingleIntances(ICommonStyleConfigComponent, CommonStyleConfigComponent);