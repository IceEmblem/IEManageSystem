import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Link, withRouter } from 'react-router-native'
import { StyleSheet, View, Text } from 'react-native'
import Setting from 'IETemplateComponents/IECategoryLabel/Setting'

import { Button, Item } from 'native-base'

class Component extends IComponent {

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

    getLinkStyle(tagName) {
        let style = {
            lineHeight: 30,
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 15,
            paddingRight: 15,
            marginLeft: 5,
            marginRight: 5,
        };

        if(this.curSelectTagName == tagName){
            style.backgroundColor = "#309bff";
            style.color = "#fff";
        }

        return style;
    }

    createItem(singleData) {
        return (
            <Button
                small
                style={styles.button}
                info={this.curSelectTagName == singleData.tagName}
                transparent={this.curSelectTagName != singleData.tagName}
                onPress={()=>{
                    this.props.history.push(this.createUrl(singleData.tagName));
                }}
            >
                <Text style={{color: this.curSelectTagName == singleData.tagName ? '#fff' : '#000A'}}>{singleData.displayName}</Text>
            </Button>
        );
    }

    render() {
        let setting = new Setting(this.getPageComponentSetting());

        return (
            <View style={[this.baseStyle, styles.view]}>
                {this.createItem({tagName: undefined, displayName: '全部'})}
                {setting.getSettings().map(item => this.createItem(item))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
        padding: 10,
    },
})

export default withRouter(Component);
