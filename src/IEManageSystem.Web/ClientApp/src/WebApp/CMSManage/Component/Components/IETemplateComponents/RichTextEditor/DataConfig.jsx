import React from 'react'
import PropTypes from 'prop-types'
import IDataConfig from 'BaseCMSManage/Components/IETemplateComponents/RichTextEditor/IDataConfig'
import CustomizeField from './CustomizeField'
import IocContainer from 'Core/IocContainer';

class DataConfig extends IDataConfig {
    render() {
        return <CustomizeField
            fieldValue={this.props.data.getDefauleData().field1}
            setFieldValue={(value) => {
                this.props.data.getDefauleData().field1 = value;
                this.props.setData(this.props.data);
            }}
        />
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

IocContainer.registerSingleIntances(IDataConfig, DataConfig);
