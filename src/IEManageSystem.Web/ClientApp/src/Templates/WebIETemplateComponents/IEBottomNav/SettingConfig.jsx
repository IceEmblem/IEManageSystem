import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IEBottomNav/Setting'
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { Input, Tag, Button } from 'antd';

class SettingConfig extends React.Component {
    setting = null;

    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <Input
                placeholder=""
                className="mb-3"
                value={setting.copyright}
                onChange={(e) => {
                    setting.copyright = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">版权声明</Tag>}
            />
            <Input
                placeholder=""
                className="mb-3"
                value={setting.text}
                onChange={(e) => {
                    setting.text = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">右边文本</Tag>}
            />
            <Input
                prefix={<Tag color="#55acee">备案图标</Tag>}
                value={setting.beianIcon}
                className="mb-3"
                onChange={(e) => {
                    setting.beianIcon = e.target.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Button size="small" type="primary" onClick={() => { this.setState({ isShowPicturePopupBox: true }) }} >选择图片</Button>}
            />
            <PicturePopupBox
                isShow={this.state.isShowPicturePopupBox}
                closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                selectPictruePath={(path) => {
                    setting.beianIcon = path;
                    this.props.setData(setting.setting);
                }}
            />
            <Input.TextArea
                rows={4}
                placeholder="备案代码"
                className="mb-3"
                value={setting.code}
                onChange={(e) => {
                    setting.code = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
            />
            <Input
                value={setting.color}
                placeholder="示例：#fff"
                className="mb-3"
                onChange={(e) => {
                    setting.color = e.target.value;
                    this.props.setData(setting.setting);
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

export default SettingConfig;
