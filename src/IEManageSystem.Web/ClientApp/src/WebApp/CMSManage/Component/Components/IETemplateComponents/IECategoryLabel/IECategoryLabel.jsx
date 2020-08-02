import React from 'react'
import { BaseStaticComponent } from '../../BaseComponents/BaseStaticComponent'
import { Link, withRouter } from 'react-router-dom'
import { List, Button } from 'antd';

import Setting from './Setting'

class IECategoryLabel extends BaseStaticComponent {

    curSelectOtherTags = [];
    curSelectTagName = "";
    curSearchPrefix = "";

    constructor(props) {
        super(props);
        this.createTags();
    }

    componentWillReceiveProps() {
        this.createTags();
    }

    getPageComponentSetting() {
        return this.getSetting("DefaultSetting");
    }

    createTags() {
        if (!this.props.history.location.search || this.props.history.location.search == "") {
            this.curSearchPrefix = "?";
            return;
        }

        let search = decodeURI(this.props.history.location.search);

        let tagRegex = /tag=([^&]*)/;
        let result = tagRegex.exec(search);
        if (!result || result.lenght == 0) {
            this.curSearchPrefix = search + "&";
            return;
        }

        let tagstr = result[1];
        let tags = JSON.parse(tagstr);

        let tagNames = new Setting(this.getPageComponentSetting()).getSettings().map(item => item.tagName);

        this.curSelectTagName = tags.find(item => tagNames.some(e => e == item));
        this.curSelectOtherTags = tags.filter(item => item != this.curSelectTagName);
        this.curSearchPrefix = search.replace(tagRegex, '').replace("&&", "&");
        if (this.curSearchPrefix[this.curSearchPrefix.length - 1] != '?'
            && this.curSearchPrefix[this.curSearchPrefix.length - 1] != '&'
        ) {
            this.curSearchPrefix = this.curSearchPrefix + "&";
        }
    }

    createUrl(tagName) {
        let newtagString;
        if (!tagName || tagName == "") {
            newtagString = `tag=${JSON.stringify([...this.curSelectOtherTags])}`;
        }
        else {
            newtagString = `tag=${JSON.stringify([...this.curSelectOtherTags, tagName])}`;
        }
        let search = this.curSearchPrefix + newtagString;

        search = encodeURI(search);

        return this.props.history.location.pathname + search;
    }

    createItem(singleData) {
        let style = {};
        if (singleData.tagName == this.curSelectTagName) {
            style.backgroundColor = "#309bff";
            style.color = "#fff";
        }
        return (
            <Link to={this.createUrl(singleData.tagName)} className={`ant-btn mr-1 ml-1 ant-btn-dashed mb-1`}
                style={style}
                onClick={this.props.pageFreshen}
            >
                {singleData.displayName}
            </Link>
        );
    }

    render() {
        let setting = new Setting(this.getPageComponentSetting());
        let style = {};
        if (!this.curSelectTagName || this.curSelectTagName == "") {
            style.backgroundColor = "#309bff";
            style.color = "#fff";
        }

        return (
            <div className="d-flex flex-wrap">
                <Link to={this.createUrl("")} className="ant-btn mr-1 ml-1 ant-btn-dashed" onClick={this.props.pageFreshen}
                    style={style}
                > 全部 </Link>
                {setting.getSettings().map(item => this.createItem(item))}
            </div>
        );
    }
}

IECategoryLabel.defaultProps = {
};

export default withRouter(IECategoryLabel);