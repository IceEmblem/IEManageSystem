import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/IComponent'
import { Link, withRouter } from 'react-router-native'
import { StyleSheet, View, Text } from 'react-native'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/Setting'

class IECategoryLabel extends IComponent {

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

    getLinkStyle(tagName){
        let style = {
            lineHeight: "30px",
            padding: "4px 15px",
            margin: "0px 5px"
        };

        if (tagName == this.curSelectTagName) {
            style.backgroundColor = "#309bff";
            style.color = "#fff";
        }

        return style;
    }

    createItem(singleData) {
        return (
            <Link
                to={this.createUrl(singleData.tagName)}
                style={this.getLinkStyle(singleData.tagName)}
            >
                <Text style={{color: 'inherit'}}>{singleData.displayName}</Text>
            </Link>
        );
    }

    render() {
        let setting = new Setting(this.getPageComponentSetting());

        return (
            <View style={styles.view}>
                <Link 
                    to={this.createUrl("")}
                    style={this.getLinkStyle()}
                >
                    <Text style={{color: 'inherit'}}>全部</Text>
                </Link>
                {setting.getSettings().map(item => this.createItem(item))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row'
    }
})

IECategoryLabel.defaultProps = {
};

export default (register) => register(IComponent, withRouter(IECategoryLabel));
