import React from 'react';
import BaseConfig from '../BaseComponent/BaseConfig';
import {ieReduxFetch} from 'Core/IEReduxFetch'

export default class PageLeafSettingConfig extends BaseConfig{
    constructor(props) {
        super(props)

        this.state = {
            pages:[]
        }
    }

    componentDidMount(){
        ieReduxFetch("/api/PageQuery/GetPages", {})
        .then(value=>{
            this.setState({pages:value.pages});
        })
    }

    render() {
        let pageList = this.state.pages.map(item => <option key={item.id} value={item.id}>{item.displayName}</option>);

        // 如果当前没有选择页面且有页面，则默认选择第一个页面
        if (!this.props.data &&
            this.state.pages.length > 0) {
            this.props.setData(this.state.pages[0].id)
        }

        return (
            <div className="col-md-12 float-left">
                <label htmlFor="sel1">指定页面:</label>
                <div className="input-group mb-3">
                    <select className="form-control"
                        onChange={(event) => {
                            this.props.setData(event.currentTarget.value)
                        }}
                        value={this.props.data}
                    >
                        {pageList}
                    </select>
                    <div className="input-group-append">
                        <span className="input-group-text">指定页面</span>
                    </div>
                </div>
            </div>
        );
    }
}