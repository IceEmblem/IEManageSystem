import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IEPostList/Setting'
import { Input, Tag, InputNumber, Switch, Radio } from 'antd';

class SettingConfig extends React.Component {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">文章列数</Tag>
                <InputNumber
                    value={setting.col}
                    onChange={(value) => {
                        setting.col = value;
                        this.props.setData(setting.setting);
                    }}
                />
            </div>
            <div className="mb-3">
                <Input
                    placeholder="图片高度（示例：web端 300px, 30rem | App端 300）"
                    value={setting.heigth}
                    onChange={(e) => {
                        setting.heigth = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">图片高度</Tag>}
                />
            </div>
            <div className="mb-3">
                <Tag color="#55acee">显示文章图片</Tag>
                <Switch
                    checked={JSON.parse(setting.isShowImg)}
                    onChange={(value) => {
                        setting.isShowImg = value.toString();
                        this.props.setData(setting.setting);
                    }} />
            </div>
            <div className="mb-3">
                <Tag color="#55acee">显示排序按钮</Tag>
                <Radio.Group
                    value={setting.hiddenSortBtn}
                    onChange={(e) => {
                        setting.hiddenSortBtn = e.target.value;
                        this.props.setData(setting.setting);
                    }} >
                    <Radio value='false'>显示</Radio>
                    <Radio value='true'>隐藏</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">显示分页按钮</Tag>
                <Radio.Group
                    value={setting.hiddenPageing}
                    onChange={(e) => {
                        setting.hiddenPageing = e.target.value;
                        this.props.setData(setting.setting);
                    }} >
                    <Radio value='false'>显示</Radio>
                    <Radio value='true'>隐藏</Radio>
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
