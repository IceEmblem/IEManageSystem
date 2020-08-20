import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPostList/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEPostList/Setting'

import defaultImg from 'images/default_post_img.jpg'
import { Link } from 'react-router-native'
import { Card, Button, Pagination } from '@ant-design/react-native'
import { StyleSheet, Image, View, Text } from 'react-native'

class IEPostList extends IComponent {
    constructor(props) {
        super(props);
    }

    createItem(post, setting) {
        let width = 100;
        if(setting.col > 0){
            width = 100 / setting.col;
        }

        let heigth = new Number(setting.heigth).valueOf();
        if(isNaN(heigth)){
            heigth = 200
        }

        let source
        if(post.imageList.length > 0 && post.imageList[0]){
            source = {uri: post.imageList[0]}
        }
        else{
            source = defaultImg;
        }

        return <View style={{ width: `${width}%`, paddingLeft: 5, paddingRight: 5, marginBottom: 10 }}>
            <Card>
                <Card.Body style={{ padding: 0 }}>
                    <Link
                        to={this.createUrl(post)}
                        component={
                            (props) => <View>
                                {
                                    setting.isShowImg == "true" ?
                                        < Image
                                            style={{ height: heigth, width: "100%" }}
                                            source={source}
                                        /> :
                                        <Text></Text>
                                }
                            </View>
                        }
                    />
                    <View style={styles.itemTextArea}>
                        <Link
                            to={this.createUrl(post)}
                            component={
                                (props) => (
                                    <View>
                                        <Text style={styles.itemTitle}>{post.title}</Text>
                                        <Text style={styles.itemDescribe}>{post.describe || "暂无简介"}</Text>
                                    </View>
                                )
                            }
                        />
                        <View style={styles.itemMeta}>
                            <Text style={styles.itemMetaText}>{`评分：${post.score} | 点击量：${post.click}`}</Text>
                            <Text style={{ textAlign: 'right' }}>{new Date(post.creationTime).toLocaleDateString()}</Text>
                        </View>
                    </View>
                </Card.Body>
            </Card>
        </View>
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));

        return (
            <View style={[this.baseStyle]}>
                <View style={styles.sortView}>
                    <Text>排序：</Text>
                    <Button style={styles.sortBtn} type="ghost" size='small' onPress={() => { this.setState({ orderby: "Date" }) }}>发表时间</Button>
                    <Button style={styles.sortBtn} type="ghost" size='small' onPress={() => { this.setState({ orderby: "Click" }) }}>点击量</Button>
                    <Button style={styles.sortBtn} type="ghost" size='small' onPress={() => { this.setState({ orderby: "Score" }) }}>评分</Button>
                </View>
                <View style={styles.list}>
                    {this.state.pageDatas.map(item => this.createItem(item, setting))}
                </View>
                <View style={styles.pageBtnView}>
                    <Button size='small' type="primary" style={styles.pageBtn} disabled={this.state.pageIndex <= 1} onPress={()=>this.setState({ pageIndex: this.state.pageIndex - 1 })}>上一页</Button>
                    <Text style={styles.pageBtnText}>{`第 ${this.state.pageIndex} 页`}</Text>
                    <Button size='small' type='primary' style={styles.pageBtn} disabled={this.state.pageDatas.length < this.state.pageSize} onPress={()=>this.setState({ pageIndex: this.state.pageIndex + 1 })}>下一页</Button>
                </View>
            </View>
        )
    }
}

const locale = {
    prevText: '上一步',
    nextText: '下一步',
};

const styles = StyleSheet.create({
    sortView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    sortBtn: {
        marginRight: 10
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemTextArea: {
        padding: 10
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "600"
    },
    itemDescribe: {
        marginTop: 10
    },
    itemMeta: {
        marginTop: 10,
    },
    itemMetaText: {
        color: '#0008'
    },
    pageBtnView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pageBtnText: {
        marginLeft: 10,
        marginRight: 10,
    },
    pageBtn:{
        margin:5,
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        color: '#fff'
    }
})

export default (register) => register(IComponent, IEPostList);
