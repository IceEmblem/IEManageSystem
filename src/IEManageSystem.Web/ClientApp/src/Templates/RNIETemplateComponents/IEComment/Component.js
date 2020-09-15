import React from 'react';
import { StyleSheet, View, Image } from 'react-native'
import defaultAvatar from 'images/default_avatar.png'
import { Form, Textarea, Button, Text, Thumbnail } from 'native-base'
import IComponent from 'IETemplateComponents/IEComment/IComponent'

class Component extends IComponent {
    createItem(comment) {
        return (
            <View style={styles.item}>
                <View>
                    <Image
                        source={comment.avatar}
                        style={styles.avatar}
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
        let comments = this.props.componentData.getSingleDatas("commentData").map(item => ({
            author: item.field2,
            avatar: item.field3 || defaultAvatar,
            content: item.field4,
            datetime: item.field5,
        }));

        // let comments = [
        //     {
        //         author: '管理员',
        //         avatar: defaultAvatar,
        //         content: '这是评论内容呀呀呀啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊1',
        //         datetime: '2020-8-26',
        //     }, {
        //         author: '管理员',
        //         avatar: defaultAvatar,
        //         content: '这是评论内容呀呀呀啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊2',
        //         datetime: '2020-8-26',
        //     }
        // ]

        return (
            <View style={[this.baseStyle]}>
                <Form>
                    <Textarea style={styles.formViewTextarea} rowSpan={5} bordered 
                        placeholder="评论内容"
                        value={this.state.value}
                        onChange={(value) => {
                            this.setState({ value: value.nativeEvent.text });
                        }}
                    />
                    <Button disabled={this.state.submitting} full
                        onPress={this.handleSubmit}
                    >
                        <Text>提交评论</Text>
                    </Button>
                </Form>
                <Text style={styles.header}>{`${comments.length} 条评论`}</Text>
                {comments.map(item => this.createItem(item))}
            </View>
        );
    }
}

let styles = StyleSheet.create({
    formViewTextarea: {

    },
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
        minHeight: 100,
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
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})

export default Component;
