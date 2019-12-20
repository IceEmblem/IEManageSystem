import React from 'react'
import PropTypes from 'prop-types'

import {BaseCustomizeField} from '../BaseComponent';
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox';

class CustomizeField extends BaseCustomizeField {
    constructor(props) {
        super(props)

        this.state = {
            isShow: false
        }
    }

    render() {
        // fieldValue = {
        //     title: "",
        //     content: "",
        //     imgSrc: ""
        // }

        return (
            <div className="Progress-editor">
                <label>{this.props.text}:</label>
                <div className="d-flex">
                    <div className="input-group mb-3 mr-3">
                        <input value={this.fieldValue.title} type="text" className="form-control" placeholder="请输入标题"
                            onChange={
                                (event) => {
                                    this.fieldValue.title = event.target.value;
                                    this.setState({});
                                }
                            }
                            onBlur={()=>{this.setFieldValue()}}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text bg-warning text-white">标题</span>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input value={this.fieldValue.imgSrc} type="text" className="form-control" placeholder="请输入图片连接"
                            onChange={
                                (event) => {
                                    this.fieldValue.imgSrc = event.target.value;
                                    this.setState({});
                                }
                            }
                            onBlur={()=>{this.setFieldValue()}}
                        />
                        <div className="input-group-append">
                            <button className="input-group-text bg-success text-white"
                                onClick={() => { this.setState({ isShow: true }) }}
                            >
                                选择图片
                            </button>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <textarea name="" id="" cols="30" rows="10" value={this.fieldValue.content} className="form-control" placeholder="请输入内容文本"
                        onChange={
                            (event) => {
                                this.fieldValue.content = event.target.value;
                                this.setState({});
                            }
                        }
                        onBlur={()=>{this.setFieldValue()}}
                    >
                    </textarea>
                    <div className="input-group-append">
                        <span className="input-group-text bg-info text-white">内容文本</span>
                    </div>
                </div>
                <PicturePopupBox
                    isShow={this.state.isShow}
                    closePopupBox={() => this.setState({ isShow: false })}
                    selectPictruePath={picPath => { 
                        this.fieldValue.imgSrc = picPath;
                        this.setFieldValue();
                        this.setState({});
                    }}
                />
            </div>
        )
    }
}

export default CustomizeField