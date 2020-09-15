import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from 'IETemplateComponents/IECategoryLabel/Setting'
import InteractivConfigFeature, { InteractivConfigFeatureClickItem, InteractivConfigFeatureTextItem } from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'

export default class Component extends IComponent{
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

    getInteractivConfigFeature(data){
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

        return new InteractivConfigFeature(items, data);
    }

    getCurrentSetting(){
        return new Setting(this.getDefaultSetting());
    }

    getTagDatas(){
        let setting = this.getCurrentSetting();

        return [
            { tagName: undefined, displayName: '全部' },
            ...setting.getSettings()
        ];
    }
}