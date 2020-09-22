import React from 'react'
import PropTypes from 'prop-types'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

class IEBraftEditor extends React.Component {
    state = {
        editorState: null
    }

    constructor(props) {
        super(props)

        this.submitContent = this.submitContent.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            editorState: BraftEditor.createEditorState(this.props.value)
        })
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            editorState: BraftEditor.createEditorState(nextprops.value)
        })
    }

    submitContent() {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        this.props.onSave(htmlContent)
    }

    handleEditorChange(editorState) {
        this.setState({ editorState })
    }

    render() {
        return (
            <BraftEditor
                value={this.state.editorState}
                onChange={this.handleEditorChange}
                onSave={this.submitContent}
                onBlur={this.submitContent}
            />
        )
    }
}

IEBraftEditor.propTypes = {
    value: PropTypes.string,
    onSave: PropTypes.func.isRequired
}

export default IEBraftEditor