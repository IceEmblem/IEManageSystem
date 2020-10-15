import React from 'react'
import PropTypes from 'prop-types'
import { Input, Tag, Radio, Button } from 'antd';

class SettingConfig extends React.Component {

    render() {
        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">文本来源</Tag>
                <Radio.Group
                    value={this.props.data.field1}
                    onChange={(e) => {
                        this.props.data.field1 = e.target.value;
                        this.props.setData(this.props.data);
                    }}
                >
                    <Radio value="PContent">文章内容</Radio>
                    <Radio value="Component">组件数据</Radio>
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
