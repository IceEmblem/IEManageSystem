import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IEImg/Setting'
import { Input, Tag, InputNumber, Radio } from 'antd';

class SettingConfig extends React.Component {
    render() {
        let setting = new Setting(this.props.data);

        return (<div className='d-flex flex-wrap'>
            <div className='col-md-6 mb-3'>
                <Input
                    placeholder="示例：web端 300px, 30rem ... | App端 300"
                    value={setting.imgHeigth}
                    onChange={(e) => {
                        setting.imgHeigth = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">图片高度</Tag>}
                />
            </div>
            <div className='col-md-6 mb-3'>
                <Input
                    placeholder="示例：web端 300px, 30rem ... | App端 300"
                    value={setting.imgWidth}
                    onChange={(e) => {
                        setting.imgWidth = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">图片宽度</Tag>}
                />
            </div>
            <div className='col-md-6 mb-3'>
                <Tag color="#55acee">内容位置</Tag>
                <Radio.Group
                    value={setting.position}
                    onChange={e => {
                        setting.position = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value='onimg'>在图片上</Radio>
                    <Radio value='onbottom'>在图片底部</Radio>
                </Radio.Group>
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default SettingConfig;
