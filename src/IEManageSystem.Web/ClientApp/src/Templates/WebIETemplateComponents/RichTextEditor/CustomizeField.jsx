import React from 'react'
import PropTypes from 'prop-types'

import IEBraftEditor from 'Common/IEBraftEditor'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

class CustomizeField extends React.Component 
{
    render() {
        return (<IEBraftEditor 
            value={this.props.fieldValue}
            onSave={(htmlContent)=>{
                this.props.setFieldValue(htmlContent)
            }}
        />)
    }
}

CustomizeField.propTypes = {
    fieldValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired
}

export default CustomizeField