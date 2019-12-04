import React from 'react'
import PropTypes from 'prop-types'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

class CustomizeField extends React.Component 
{
    constructor(props){
        super(props)

        this.submitContent = this.submitContent.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    
    submitContent(){
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        this.props.setFieldValue(htmlContent)
    }

    handleEditorChange(editorState){
        this.setState({ editorState })
    }

    render() {
        return (
            <div className="richtexteditor-editor">
                <BraftEditor
                    className="richtexteditor-editor-bf"
                    value={this.props.fieldValue}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
                <h5>注：记得按 Ctrl + s 键保存再提交</h5>
            </div>
        )
    }
}

CustomizeField.propTypes = {
    fieldValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired
}

export default CustomizeField