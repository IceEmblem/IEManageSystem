import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Link, withRouter } from 'react-router-native'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Text, Icon } from 'native-base'

// 排行组件
class Component extends IComponent {
    render() {
        return (
            <List style={[this.baseStyle]}>
                {this.props.posts.map((item, index) => (
                    <ListItem
                        noBorder
                        style={[styles.line, index == 0 && styles.firstLine]}
                        onPress={() => {
                            this.props.history.push(this.props.createUrl(item));
                        }}
                    >
                        <View
                            style={[styles.Icon, index == 0 && styles.firstIcon]}
                        >
                            <Icon name='rocket1' color='#fff' type='AntDesign' />
                        </View>
                        <View style={styles.itemRight}>
                            <Text>{item.title}</Text>
                            <Icon name='right' color='#fff' type='AntDesign' />
                        </View>
                    </ListItem>
                ))}
            </List>
        )
    }
}

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginLeft: 0,
    },
    Icon: {
        backgroundColor: '#db3964',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstLine: {
        backgroundColor: "#40a9ff",
        color: '#fff'
    },
    firstIcon: {
        backgroundColor: '#FFD700',
    },
    itemRight:{
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    }
})

export default withRouter(Component);
