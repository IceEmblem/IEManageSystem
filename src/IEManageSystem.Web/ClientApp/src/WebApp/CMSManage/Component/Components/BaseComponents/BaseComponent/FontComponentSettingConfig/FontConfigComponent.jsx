import React from 'react'
import Theme from 'BaseLayout/Theme'
import { IFontConfigComponent } from 'BaseCMSManage/Components/BaseComponents/BaseComponent/FontComponentSettingConfig'
import Setting from 'BaseCMSManage/Components/BaseComponents/BaseComponent/FontComponentSettingConfig/Setting'

import { Input, Tag, InputNumber, Button, Radio } from 'antd';
import { SketchPicker } from 'react-color';
import IocContainer from 'Core/IocContainer';

export default class FontConfigComponent extends IFontConfigComponent {
    state = {
        isShowColorPicker: false
    }

    render() {
        let setting = new Setting(this.props.data);

        return <div className="d-flex flex-md-wrap">
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：16px"
                    value={setting.fontSize}
                    onChange={
                        (event) => {
                            setting.fontSize = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>字体大小</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：24px"
                    value={setting.lineHeight}
                    onChange={
                        (event) => {
                            setting.lineHeight = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>行高</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：#000"
                    value={setting.color}
                    onChange={
                        (event) => {
                            setting.color = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    onClick={() => this.setState({ isShowColorPicker: !this.state.isShowColorPicker })}
                    suffix={<Tag color={Theme.primary}>字体颜色</Tag>}
                />
                <div>
                    <div style={{ position: 'absolute', zIndex: 999 }}>
                        {
                            this.state.isShowColorPicker &&
                            <SketchPicker
                                color={setting.color || '#0000'}
                                onChange={(color, e) => {
                                    setting.color = color.hex;
                                    this.props.setData(setting.setting)
                                }}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：600"
                    value={setting.fontWeight}
                    onChange={
                        (event) => {
                            setting.fontWeight = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>字重</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <Input
                    placeholder="示例：italic"
                    value={setting.fontStyle}
                    onChange={
                        (event) => {
                            setting.fontStyle = event.target.value;
                            this.props.setData(setting.setting);
                        }
                    }
                    suffix={<Tag color={Theme.primary}>字体风格</Tag>}
                />
            </div>
        </div>
    }
}

IocContainer.registerSingleIntances(IFontConfigComponent, FontConfigComponent);