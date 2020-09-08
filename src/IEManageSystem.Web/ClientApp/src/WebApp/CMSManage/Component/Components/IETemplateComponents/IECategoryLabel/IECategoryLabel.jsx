import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/IComponent'
import { Link, withRouter } from 'react-router-dom'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/Setting'
import InteractivConfigFeature, { InteractivConfigFeatureClickItem, InteractivConfigFeatureTextItem } from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'

class IECategoryLabel extends IComponent {

    curSelectOtherTags = [];
    curSelectTagName = undefined;
    curSearchPrefix = "";

    constructor(props) {
        super(props);
        this.createTags();
    }

    componentWillReceiveProps() {
        this.createTags();
    }

    // 每次组件刷新时，更新当前选择的标签
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

        let tagNames = new Setting(this.getDefaultSetting()).getSettings().map(item => item.tagName);

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

    getCurStyle(tagName) {
        let style = {};

        if (tagName == this.curSelectTagName) {
            style.backgroundColor = "#309bff";
            style.color = "#fff";
        }

        return style;
    }

    createItem(singleData) {
        return (
            <Link to={this.createUrl(singleData.tagName)} className={`ant-btn mr-1 ml-1 ant-btn-dashed mb-1`}
                style={this.getCurStyle(singleData.tagName)}
            >
                {singleData.displayName}
            </Link>
        );
    }

    defaultComponent(datas) {
        return (
            <div className="d-flex flex-wrap">
                {datas.map(item => this.createItem(item))}
            </div>
        );
    }

    interactiveComponent(datas) {
        let items = [
            new InteractivConfigFeatureTextItem('text', '标签项文本', (data) => {
                return data.displayName;
            }),
            new InteractivConfigFeatureClickItem('click', '标签项点击', (data) => {
                return () => {
                    this.props.history.push(this.createUrl(data.tagName));
                }
            }),
        ];

        return (
            <div className="d-flex flex-wrap">
                {datas.map(item => {
                    let Component;
                    if (item.tagName == this.curSelectTagName) {
                        Component = this.props.ChildComponent['selected'];
                    }
                    else{
                        Component = this.props.ChildComponent['unselect'];
                    }

                    if (Component) {
                        return <Component
                            interactivConfigFeature={new InteractivConfigFeature(items, item)}
                        />
                    }
                    else{
                        return this.createItem(item);
                    }
                })}
            </div>
        );
    }

    render() {
        let setting = new Setting(this.getDefaultSetting());

        let datas = [
            { tagName: undefined, displayName: '全部' },
            ...setting.getSettings()
        ];

        if (!this.props.isExitChild) {
            return this.defaultComponent(datas);
        }
        else {
            return this.interactiveComponent(datas);
        }
    }
}

IECategoryLabel.defaultProps = {
};

export default (register) => register(IComponent, withRouter(IECategoryLabel));
