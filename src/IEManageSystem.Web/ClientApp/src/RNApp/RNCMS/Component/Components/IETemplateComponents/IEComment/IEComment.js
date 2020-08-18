import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEComment/IComponent'
import { StyleSheet, View, Text, Image } from 'react-native'
import defaultAvatar from 'images/default_avatar.png'

class IEComment extends IComponent {
    state = {
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        this.setState({ submitting: true });
        this.props.execLogic(this.state.value)
            .then(value => {
                this.setState({ submitting: false, value: '' });
                this.props.pageFreshen();
            });
    };

    createItem(comment) {
        return (
            <View style={styles.item}>
                <View>
                    <Image
                        source={comment.avatar}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50% 50%"
                        }}
                    />
                </View>
                <View style={styles.itemRight}>
                    <View style={styles.itemRightHeader}>
                        <Text style={styles.itemRightHeaderText}>{comment.author}</Text>
                        <Text style={styles.itemRightHeaderText}>{comment.datetime}</Text>
                    </View>
                    <Text style={styles.itemRightCommentText}>
                        {comment.content}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        let comments = [
            {
                author: "打不死的",
                avatar: defaultAvatar,
                content: "这是又是一条测试评论。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。",
                datetime: "2020-8-12 12:00:03",
            },
            {
                author: "打不死的",
                avatar: defaultAvatar,
                content: "这是又是一条测试评论。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。",
                datetime: "2020-8-12 12:00:03",
            }
        ]

        return (
            <View>
                <Text style={styles.header}>{`${comments.length} 条评论`}</Text>
                {comments.map(item => this.createItem(item))}
            </View>
        );
    }
}

let styles = StyleSheet.create({
    header: {
        borderStyle: "solid", 
        borderBottomWidth: 1, 
        borderBottomColor: "#0004",
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        color: '#000A',
    },
    item: {
        minHeight: "100px", 
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemRight: {
        flexShrink: 1, 
        flexGrow: 1, 
        paddingLeft: 15,
        paddingRight: 15
    },
    itemRightHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 10,
        
    },
    itemRightHeaderText: {
        color: "#0008"
    },
    itemRightCommentText: {
        color: "#000A"
    }
})

export default (register) => register(IComponent, IEComment);
