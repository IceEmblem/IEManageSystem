import React from 'react'
import PropTypes from 'prop-types'
import CustomizeField from './CustomizeField'

class DataConfig extends React.Component {
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

export default DataConfig;
