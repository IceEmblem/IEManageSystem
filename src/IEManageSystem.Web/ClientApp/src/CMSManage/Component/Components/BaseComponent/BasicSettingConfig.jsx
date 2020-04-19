import React from 'react';
import BaseConfig from './BaseConfig';

// 基本设置 配置
export default class BasicSettingConfig extends BaseConfig{
    render() {
        return (
            <div className="d-flex flex-md-wrap">
                <div className="col-md-6 float-left">
                    <label>请输入1~12网格宽度：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.data.col || ""} type="text" className="form-control" placeholder="网格宽度"
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ col: event.target.value }
                                    })
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">网格宽度</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入组件高度（例：9rem）：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.data.height || ""} type="text" className="form-control" placeholder="组件高度"
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ height: event.target.value }
                                    });
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">组件高度</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入内边距（例：0.3rem 或 0rem 0.3rem）：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.data.padding || ""} type="text" className="form-control" placeholder="内边距"
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ padding: event.target.value }
                                    });
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">内边距</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入外边距（例：0.3rem 或 0rem 0.3rem）：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.data.margin || ""} type="text" className="form-control" placeholder="外边距"
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ margin: event.target.value }
                                    });
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">外边距</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入背景颜色（例：#ffffff）：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.data.backgroundColor || ""} type="text" className="form-control" placeholder="背景颜色"
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ backgroundColor: event.target.value }
                                    });
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">背景颜色</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入class：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.data.className || ""} type="text" className="form-control" placeholder="样式类"
                            onChange={
                                (event) => {
                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ className: event.target.value }
                                    });
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">样式类</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 float-left">
                    <label>请输入排序索引(必须是数字)：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.data.sortIndex || ""} type="number" className="form-control" placeholder="排序索引"
                            onChange={
                                (event) => {
                                    let index = parseInt(event.target.value);
                                    if(isNaN(index)){
                                        return;
                                    }

                                    this.props.setData({
                                        ...this.props.data,
                                        ...{ sortIndex: index }
                                    });
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">排序索引</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}