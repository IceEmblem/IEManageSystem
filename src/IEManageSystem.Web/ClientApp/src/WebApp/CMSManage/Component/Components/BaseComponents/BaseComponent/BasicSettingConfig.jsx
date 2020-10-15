import React from 'react';
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox';
import {IocContainer} from 'ice-common';
import { IBasicSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import PageComponentModel from 'BaseCMSManage/Models/Pages/PageComponentModel'
import { SketchPicker } from 'react-color'

import { Input, Tag, InputNumber, Button, Radio } from 'antd';

// props.data 类型为 PageComponentModel
// props.setData 类型为 (PageComponentModel) => void
// 基本设置 配置
class BasicSettingConfig extends IBasicSettingConfig {
    state = {
        isShowPicturePopupBox: false,
        isShowColorPicker: false
    }

    render() {
        return (
            <div className="d-flex flex-md-wrap">
                <div className="col-md-6 bg-light mb-3">
                    <label>宽度（Web端：50, 50%, 50px, 50rem | App端：50, 50%）</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="宽度"
                            value={this.props.data.pageComponentBaseSetting.width}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.width = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">宽度</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>高度（Web端：50, 50%, 50px, 50rem | App端：50, 50%）</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="组件高度"
                            value={this.props.data.pageComponentBaseSetting.height}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.height = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">组件高度</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>内边距（Web端：50, 50px, 50px 10px, ... | App端：50）</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="内边距"
                            value={this.props.data.pageComponentBaseSetting.padding}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.padding = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">内边距</Tag>}
                        />
                    </div>
                    <div className='d-flex mb-3 justify-content-between align-items-center'>
                        <span>左</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.paddingLeft}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.paddingLeft = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                        <span>右</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.paddingRight}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.paddingRight = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                        <span>上</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.paddingTop}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.paddingTop = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                        <span>下</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.paddingBottom}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.paddingBottom = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>外边距（Web端：50, 50px, 50px 10px, ... | App端：50）</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="外边距"
                            value={this.props.data.pageComponentBaseSetting.margin}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.margin = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">外边距</Tag>}
                        />
                    </div>
                    <div className='d-flex mb-3 justify-content-between align-items-center'>
                        <span>左</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.marginLeft}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.marginLeft = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                        <span>右</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.marginRight}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.marginRight = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                        <span>上</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.marginTop}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.marginTop = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                        <span>下</span>
                        <InputNumber
                            value={this.props.data.pageComponentBaseSetting.marginBottom}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.marginBottom = value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>边框（Web端：1px solid #000 | App 端：不支持）</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="边框"
                            value={this.props.data.pageComponentBaseSetting.border}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.border = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">边框</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>圆角（Web端：50px, 50% ... | App 端：50, 50%)</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="圆角"
                            value={this.props.data.pageComponentBaseSetting.borderRadius}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.borderRadius = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">圆角</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>元素定位</label>
                    <Radio.Group
                        value={this.props.data.pageComponentBaseSetting.position}
                        onChange={
                            (event) => {
                                this.props.data.pageComponentBaseSetting.position = event.target.value;
                                this.props.setData(this.props.data)
                            }
                        }
                    >
                        <Radio value=''>无</Radio>
                        <Radio value='absolute'>绝对文档（absolute）</Radio>
                        <Radio value='relative'>相对（relative）</Radio>
                        <Radio value='fixed'>绝对浏览器（fixed）</Radio>
                    </Radio.Group>
                </div>
                {
                    this.props.data.pageComponentBaseSetting.position &&
                    <div className="col-md-6 bg-light mb-3">
                        <label>元素位置</label>
                        <div className='d-flex mb-3 justify-content-between align-items-center'>
                            <span>左</span>
                            <InputNumber
                                value={this.props.data.pageComponentBaseSetting.left}
                                onChange={
                                    (value) => {
                                        this.props.data.pageComponentBaseSetting.left = value;
                                        this.props.setData(this.props.data)
                                    }
                                }
                            />
                            <span>右</span>
                            <InputNumber
                                value={this.props.data.pageComponentBaseSetting.right}
                                onChange={
                                    (value) => {
                                        this.props.data.pageComponentBaseSetting.right = value;
                                        this.props.setData(this.props.data)
                                    }
                                }
                            />
                            <span>上</span>
                            <InputNumber
                                value={this.props.data.pageComponentBaseSetting.top}
                                onChange={
                                    (value) => {
                                        this.props.data.pageComponentBaseSetting.top = value;
                                        this.props.setData(this.props.data)
                                    }
                                }
                            />
                            <span>下</span>
                            <InputNumber
                                value={this.props.data.pageComponentBaseSetting.bottom}
                                onChange={
                                    (value) => {
                                        this.props.data.pageComponentBaseSetting.bottom = value;
                                        this.props.setData(this.props.data)
                                    }
                                }
                            />
                        </div>
                    </div>
                }
                <div className="col-md-6 bg-light mb-3">
                    <label>背景颜色（例：#ffffff，主题颜色请输入 theme）</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="背景颜色"
                            value={this.props.data.pageComponentBaseSetting.backgroundColor}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.backgroundColor = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Button
                                size='small'
                                type='primary'
                                onClick={() => this.setState({ isShowColorPicker: !this.state.isShowColorPicker })}>选择颜色</Button>}
                        />
                    </div>
                    <div>
                        <div style={{ position: 'absolute', zIndex: 999 }}>
                            {
                                this.state.isShowColorPicker &&
                                <SketchPicker
                                    color={this.props.data.pageComponentBaseSetting.backgroundColor || '#0000'}
                                    onChange={(color, e) => {
                                        this.props.data.pageComponentBaseSetting.backgroundColor = color.hex;
                                        this.props.setData(this.props.data)
                                    }} />
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>背景图片</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="背景图片"
                            value={this.props.data.pageComponentBaseSetting.backgroundImage}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.backgroundImage = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Button size="small" type="primary" onClick={() => { this.setState({ isShowPicturePopupBox: true }) }} >选择图片</Button>}
                        />
                    </div>
                    <PicturePopupBox
                        isShow={this.state.isShowPicturePopupBox}
                        closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                        selectPictruePath={(path) => {
                            this.props.data.pageComponentBaseSetting.backgroundImage = path;
                            this.props.setData(this.props.data)
                        }}
                    />
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>样式class（App 没有class）</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="样式类"
                            value={this.props.data.pageComponentBaseSetting.className}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.className = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">样式类</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>{'自定义样式（Json 格式，示例：{"width": "100%"}'}</label>
                    <div className="input-group mb-3">
                        <Input.TextArea
                            placeholder="自定义样式"
                            value={this.props.data.pageComponentBaseSetting.style}
                            onChange={
                                (event) => {
                                    this.props.data.pageComponentBaseSetting.style = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>请输入排序索引(必须是数字)：</label>
                    <div className="input-group mb-3">
                        <InputNumber
                            placeholder="排序索引"
                            value={this.props.data.pageComponentBaseSetting.sortIndex}
                            onChange={
                                (value) => {
                                    this.props.data.pageComponentBaseSetting.sortIndex = value || 0;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">排序索引</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>父组件标识 <small style={{ color: "#0005" }}>如果想把组件放在在根下面，请填写 {PageComponentModel.RootComponentSign}</small> ：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="父组件标识"
                            value={this.props.data.parentSign}
                            onChange={
                                (event) => {
                                    this.props.data.parentSign = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">父组件标识</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 bg-light mb-3">
                    <label>组件标识 <small style={{ color: "#0005" }}>不要随意改动组件标识，否则无法展示组件数据</small> ：</label>
                    <div className="input-group mb-3">
                        <Input
                            placeholder="组件标识"
                            value={this.props.data.sign}
                            onChange={
                                (event) => {
                                    this.props.data.sign = event.target.value;
                                    this.props.setData(this.props.data)
                                }
                            }
                            suffix={<Tag color="#55acee">"唯一" 组件标识</Tag>}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

IocContainer.registerSingleIntances(IBasicSettingConfig, BasicSettingConfig);