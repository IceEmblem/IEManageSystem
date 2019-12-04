import React from 'react'
import PropTypes from 'prop-types'

class CustomizeField extends React.Component {
    constructor(props) {
        super(props)

        this.setFieldValue = this.setFieldValue.bind(this)

        let fieldValue = props.fieldValue ? JSON.parse(props.fieldValue) : {};
        this.title = fieldValue.title;
        this.content = fieldValue.content;
        this.btnTitle = fieldValue.btnTitle;
    }

    getFieldValue(){
        return this.props.fieldValue ? JSON.parse(this.props.fieldValue) : {};
    }
    
    setFieldValue(fieldValue) {
        if((fieldValue.title && fieldValue.title.length > 0) || 
            (fieldValue.content && fieldValue.content.length > 0) || 
            (fieldValue.btnTitle && fieldValue.btnTitle.length > 0))
        {
            this.props.setFieldValue(JSON.stringify(fieldValue));
        }
    }

    render() {
        // fieldValue = {
        //     title: "",
        //     content: "",
        //     btnTitle: ""
        // }
        let fieldValue = this.getFieldValue();

        return (
            <div className="Progress-editor">
                <label>{this.props.text}:</label>
                <div className="d-flex">
                    <div className="input-group mb-3 mr-3">
                        <input value={fieldValue.title} type="text" className="form-control" placeholder="请输入标题"
                            onChange={
                                (event) => {
                                    fieldValue.title = event.target.value;
                                    this.setFieldValue(fieldValue);
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text bg-warning text-white">标题</span>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input value={fieldValue.btnTitle} type="text" className="form-control" placeholder="请输入按钮文本"
                            onChange={
                                (event) => {
                                    fieldValue.btnTitle = event.target.value;
                                    this.setFieldValue(fieldValue);
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text bg-success text-white">按钮文本</span>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <textarea name="" id="" cols="30" rows="10" value={fieldValue.content} className="form-control" placeholder="请输入内容文本"
                        onChange={
                            (event) => {
                                fieldValue.content = event.target.value;
                                this.setFieldValue(fieldValue);
                            }
                        }
                    >
                    </textarea>
                    <div className="input-group-append">
                        <span className="input-group-text bg-info text-white">内容文本</span>
                    </div>
                </div>
            </div>
        )
    }
}

CustomizeField.propTypes = {
    fieldValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired,
    text: PropTypes.string
}

export default CustomizeField