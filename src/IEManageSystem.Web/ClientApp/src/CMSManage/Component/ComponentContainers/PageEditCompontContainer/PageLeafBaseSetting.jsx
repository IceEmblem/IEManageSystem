import React from 'react';
import PropTypes from 'prop-types';
import BaseSetting from './BaseSetting'
import {ieReduxFetch} from "Core/IEReduxFetch"

class PageLeafBaseSetting extends BaseSetting {
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

    customizeFields() {
        let pageList = this.state.pages.map(item => <option key={item.id} value={item.id}>{item.displayName}</option>);

        // 如果当前没有选择页面且有页面，则默认选择第一个页面
        if (!this.props.pageComponentSetting.targetPageId &&
            this.state.pages.length > 0) {
            this.props.setPageComponentSetting({
                ...this.props.pageComponentSetting,
                ...{ targetPageId: this.state.pages[0].id }
            })
        }

        return (
            <div className="col-md-6 float-left">
                <label htmlFor="sel1">指定页面:</label>
                <div className="input-group mb-3">
                    <select className="form-control"
                        onChange={(event) => {
                            this.props.setPageComponentSetting({
                                ...this.props.pageComponentSetting,
                                ...{ targetPageId: event.currentTarget.value }
                            })
                        }}
                        value={this.props.pageComponentSetting.targetPageId}
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

PageLeafBaseSetting.propTypes = {
    pageComponentSetting: PropTypes.object.isRequired,
    setPageComponentSetting: PropTypes.func.isRequired
};

export default PageLeafBaseSetting