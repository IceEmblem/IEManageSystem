import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IERankingList/IComponent'
import { Link } from 'react-router-native'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

// 排行组件
class IERankingList extends IComponent {
    constructor(props) {
        super(props);
    }

    // 忽略父元素的刷新
    componentWillReceiveProps(nextprops) {
    }

    render() {

        return (
            <View style={[this.baseStyle]}>
                {this.state.pageDatas.map((item, index) => (
                    <View
                        style={
                            index == 0 ? styles.firstLine :
                                styles.line
                        }
                    >
                        <View>
                            <Link
                                to={this.createUrl(item)}
                            >
                                <Text>{item.title}</Text>
                            </Link>
                        </View>
                        <View
                            style={
                                index == 0 ? styles.firstIcon :
                                    styles.Icon
                            }
                        >
                            <Icon name='Trophy' color='#fff' />
                        </View>
                    </View>
                ))}
            </View>
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
})

export default (register) => register(IComponent, IERankingList);
