import React from 'react';
import { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox';
import IocContainer from 'Core/IocContainer';
import {IBasicSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseComponent'

import { Input, Tag, InputNumber, Button } from 'antd';

// props.data 类型为 PageComponentModel
// props.setData 类型为 (PageComponentModel) => void
// 基本设置 配置
class BasicSettingConfig extends IBasicSettingConfig {
    state = {
        isShowPicturePopupBox: false
    }

    render() {
        return (
            <div className="d-flex flex-md-wrap">
                <div className="col-md-6 float-left">
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
                <div className="col-md-6 float-left">
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
                <div className="col-md-6 float-left">
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
                </div>
                <div className="col-md-6 float-left">
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
                </div>
                <div className="col-md-6 float-left">
                    <label>背景颜色（例：#ffffff）</label>
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
                            suffix={<Tag color="#55acee">背景颜色</Tag>}
                        />
                    </div>
                </div>
                <div className="col-md-6 float-left">
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
                <div className="col-md-6 float-left">
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
                <div className="col-md-6 float-left">
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
                <div className="col-md-12 float-left">
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

const buildBasicSettingConfig = function () {
    return ComponentSettingConfig.BuildBasicComponentSettingConfig("ieBaiscSetting", "基本设置",
        (pageComponentSetting, setPageComponentSetting) => {
            return <BasicSettingConfig
                data={pageComponentSetting}
                setData={setPageComponentSetting}
            />;
        }
    );
}

IocContainer.registerTransient(IBasicSettingConfig, buildBasicSettingConfig);