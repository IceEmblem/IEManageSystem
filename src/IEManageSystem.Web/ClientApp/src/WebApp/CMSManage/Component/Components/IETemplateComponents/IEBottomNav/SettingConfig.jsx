import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IEBottomNav/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEBottomNav/Setting'
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { Input, Tag, Button } from 'antd';

class SettingConfig extends ISettingConfig {
    setting = null;

    state = {
        isShowPicturePopupBox: false
    }

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        return (<div>
            <Input
                placeholder=""
                className="mb-3"
                value={this.setting.copyright}
                onChange={(e) => {
                    this.setting.copyright = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">版权声明</Tag>}
            />
            <Input
                placeholder=""
                className="mb-3"
                value={this.setting.text}
                onChange={(e) => {
                    this.setting.text = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">右边文本</Tag>}
            />
            <Input
                prefix={<Tag color="#55acee">备案图标</Tag>}
                value={this.setting.beianIcon}
                className="mb-3"
                onChange={(e) => {
                    this.setting.beianIcon = e.target.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Button size="small" type="primary" onClick={() => { this.setState({ isShowPicturePopupBox: true }) }} >选择图片</Button>}
            />
            <PicturePopupBox
                isShow={this.state.isShowPicturePopupBox}
                closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                selectPictruePath={(path) => {
                    this.setting.beianIcon = path;
                    this.props.setData(this.setting.setting);
                }}
            />
            <Input.TextArea
                rows={4}
                placeholder="备案代码"
                className="mb-3"
                value={this.setting.code}
                onChange={(e) => {
                    this.setting.code = e.currentTarget.value;
                    this.props.setData(this.setting.setting);
                }}
            />
            <Input
                value={this.setting.color}
                placeholder="示例：#fff"
                className="mb-3"
                onChange={(e) => {
                    this.setting.color = e.target.value;
                    this.props.setData(this.setting.setting);
                }}
                suffix={<Tag color="#55acee">字体颜色</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(ISettingConfig, SettingConfig);
