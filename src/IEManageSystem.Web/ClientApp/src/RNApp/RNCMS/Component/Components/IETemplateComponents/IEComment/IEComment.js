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
                            width: 40,
                            height: 40,
                            borderRadius: 20
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
        let comments = this.props.componentData.getSingleDatas("commentData").map(item => ({
            author: item.field2,
            avatar: item.field3 || defaultAvatar,
            content: <p>{item.field4}</p>,
            datetime: item.field5,
        }));

        return (
            <View style={[this.baseStyle]}>
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
    }
})

export default (register) => register(IComponent, IEComment);
