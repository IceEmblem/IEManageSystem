import React from 'react';
import BaseConfig from '../BaseComponent/BaseConfig';
import {ieReduxFetch} from 'Core/IEReduxFetch'

export default class MenuSettingConfig extends BaseConfig{
    constructor(props) {
        super(props)

        this.state = {
            menus:[]
        }
    }

    componentDidMount(){
        ieReduxFetch("/api/Menu/GetMenus", {})
        .then(value=>{
            this.setState({menus:value.menus});
        })
    }

    render() {
        let menuList = this.state.menus.map(item => <option key={item.id} value={item.id}>{item.displayName}</option>);

        // 如果当前没有选择页面且有页面，则默认选择第一个页面
        if (!this.props.data &&
            this.state.menus.length > 0) {
            this.props.setData(this.state.menus[0].id)
        }

        return (
            <div className="col-md-12 float-left">
                <label htmlFor="sel1">指定菜单:</label>
                <div className="input-group mb-3">
                    <select className="form-control"
                        onChange={(event) => {
                            this.props.setData(event.currentTarget.value);
                            this.setState({});
                        }}
                        value={this.props.data}
                    >
                        {menuList}
                    </select>
                    <div className="input-group-append">
                        <span className="input-group-text">指定菜单</span>
                    </div>
                </div>
            </div>
        );
    }
}