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
        let width = 100 / setting.col;
        return <View style={{ width: `${width}%`, paddingLeft: "5px", paddingRight: "5px", marginBottom: '10px' }}>
            <Card>
                <Card.Body style={{ padding: 0 }}>
                    <Link
                        to={this.createUrl(post)}
                        component={
                            (props) => <View>
                                {
                                    setting.isShowImg == "true" ?
                                        < Image
                                            style={{ height: setting.heigth, width: "100%" }}
                                            source={post.imageList.length > 0 && post.imageList[0] ? post.imageList[0] : defaultImg}
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
            <View>
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
        marginBottom: '10px'
    },
    sortBtn: {
        marginRight: '10px'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemTextArea: {
        padding: "10px"
    },
    itemTitle: {
        fontSize: "16px",
        fontWeight: 600
    },
    itemDescribe: {
        marginTop: '10px'
    },
    itemMeta: {
        marginTop: '10px',
    },
    itemMetaText: {
        color: '#0008'
    },
    pageBtnView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pageBtnText: {
        marginLeft: '10px',
        marginRight: '10px',
    },
    pageBtn:{
        margin:'5px',
        fontSize: "16px",
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '25px',
        paddingRight: '25px'
    }
})

export default (register) => register(IComponent, IEPostList);
