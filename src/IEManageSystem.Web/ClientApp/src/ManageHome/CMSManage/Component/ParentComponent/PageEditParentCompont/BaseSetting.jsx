import React from 'react';
import PropTypes from 'prop-types';

class BaseSetting extends React.Component {
    // this.props.pageComponentSetting
    // this.props.setPageComponentSetting
    constructor(props) {
        super(props)
    }

    customizeFields(){
        return undefined;
    }

    render() {
        return (
            <div className="d-flex flex-md-wrap">
                <div className="col-md-6 float-left">
                    <label>请输入1~12网格宽度：</label>
                    <div className="input-group mb-3">
                        <input value={this.props.pageComponentSetting.col || ""} type="text" className="form-control" placeholder="网格宽度"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
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
                        <input value={this.props.pageComponentSetting.height || ""} type="text" className="form-control" placeholder="组件高度"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ height: event.target.value }
                                    })
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
                        <input value={this.props.pageComponentSetting.padding || ""} type="text" className="form-control" placeholder="内边距"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ padding: event.target.value }
                                    })
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
                        <input value={this.props.pageComponentSetting.margin || ""} type="text" className="form-control" placeholder="外边距"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ margin: event.target.value }
                                    })
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
                        <input value={this.props.pageComponentSetting.backgroundColor || ""} type="text" className="form-control" placeholder="背景颜色"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ backgroundColor: event.target.value }
                                    })
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
                        <input value={this.props.pageComponentSetting.className || ""} type="text" className="form-control" placeholder="样式类"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ className: event.target.value }
                                    })
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">样式类</span>
                        </div>
                    </div>
                </div>
                {this.customizeFields()}
            </div>
        );
    }
}

BaseSetting.propTypes = {
    pageComponentSetting: PropTypes.object.isRequired,
    setPageComponentSetting: PropTypes.func.isRequired
};

export default BaseSetting