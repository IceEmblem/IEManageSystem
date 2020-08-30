import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IERankingList/IComponent'
import { Link, withRouter } from 'react-router-native'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Text, Icon } from 'native-base'

// 排行组件
class IERankingList extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <List style={[this.baseStyle]}>
                {this.props.posts.map((item, index) => (
                    <ListItem
                        style={
                            index == 0 ? styles.firstLine :
                                styles.line
                        }
                        onPress={() => {
                            this.props.history.push(this.props.createUrl(item));
                        }}
                    >
                        <View
                            style={
                                index == 0 ? styles.firstIcon :
                                    styles.Icon
                            }
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
        padding: 15
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: "#40a9ff",
        color: '#fff'
    },
    firstIcon: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemRight:{
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    }
})

export default (register) => register(IComponent, withRouter(IERankingList));
