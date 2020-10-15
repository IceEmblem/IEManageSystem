import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IEMenu/Setting'
import { Input, Tag, InputNumber, Switch } from 'antd';

class SettingConfig extends React.Component {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default SettingConfig;
