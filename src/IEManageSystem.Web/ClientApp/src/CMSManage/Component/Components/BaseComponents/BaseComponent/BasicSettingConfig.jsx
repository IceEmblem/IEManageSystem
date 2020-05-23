import React from 'react';
import BaseConfig from './BaseConfig';
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'

import { Input, Tag, InputNumber, Button } from 'antd';

// props.data 类型为 PageComponentBaseSettingModel
// props.setData 类型为 (PageComponentBaseSettingModel) => void
// 基本设置 配置
export default class BasicSettingConfig extends BaseConfig {
    state={
        isShowPicturePopupBox: false
    }

    render() {
        return (
            <div className="d-flex flex-md-wrap">
                <div className="col-md-6 float-left">
                    <label>请输入宽度（例如：50%）：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="宽度"
                            value={this.props.data.col}
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ col: event.target.value }
                                    })
                                }
                            }
                            suffix={<Tag color="#55acee">宽度</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入组件高度（例：9rem）：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="组件高度"
                            value={this.props.data.height}
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ height: event.target.value }
                                    });
                                }
                            }
                            suffix={<Tag color="#55acee">组件高度</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入内边距（例：0.3rem 或 0rem 0.3rem）：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="内边距"
                            value={this.props.data.padding}
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ padding: event.target.value }
                                    });
                                }
                            }
                            suffix={<Tag color="#55acee">内边距</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入外边距（例：0.3rem 或 0rem 0.3rem）：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="外边距"
                            value={this.props.data.margin}
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ margin: event.target.value }
                                    });
                                }
                            }
                            suffix={<Tag color="#55acee">外边距</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入背景颜色（例：#ffffff）：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="背景颜色"
                            value={this.props.data.backgroundColor}
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ backgroundColor: event.target.value }
                                    });
                                }
                            }
                            suffix={<Tag color="#55acee">背景颜色</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入选择背景图片：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="背景图片"
                            value={this.props.data.backgroundImage}
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ backgroundImage: event.target.value }
                                    });
                                }
                            }
                            suffix={<Button size="small" type="primary" onClick={()=>{this.setState({isShowPicturePopupBox: true})}} >选择图片</Button>}
                        />
                    </div>
                    <PicturePopupBox 
                        isShow={this.state.isShowPicturePopupBox}
                        closePopupBox={()=>{this.setState({isShowPicturePopupBox: false})}}
                        selectPictruePath={(path)=>{
                            this.props.setData({
                                ...this.props.data,
                                ...{ backgroundImage: path }
                            });
                        }}
                    />
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入class：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="样式类"
                            value={this.props.data.className}
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ className: event.target.value }
                                    });
                                }
                            }
                            suffix={<Tag color="#55acee">样式类</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入排序索引(必须是数字)：</label>
                    <div className="input-group mb-3">
                        <InputNumber
                            placeholder="排序索引"
                            value={this.props.data.sortIndex}
                            onChange={
                                (value) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ sortIndex: value || 0 }
                                    });
                                }
                            }
                            suffix={<Tag color="#55acee">排序索引</Tag>}
                        />
                    </div>
                </div>
            </div>
        );
    }
}