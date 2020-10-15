import React from 'react'
import PropTypes from 'prop-types'

import IEBraftEditor from 'Common/IEBraftEditor'
import 'braft-editor/dist/index.css'

class DataConfig extends React.Component {
    render() {
        return (<IEBraftEditor 
            value={this.props.data.getDefauleData().field1}
            onSave={(htmlContent)=>{
                this.props.data.getDefauleData().field1 = htmlContent;
                this.props.setData(this.props.data);
            }}
        />)
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default DataConfig;
