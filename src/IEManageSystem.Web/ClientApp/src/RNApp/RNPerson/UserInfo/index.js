import React from 'react'
import { View, StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'
import { getUserInfoFetch } from 'BasePerson/IEReduxs/Actions'
import IERedux from 'BasePerson/IEReduxs/PersonalRedux'

import imgAvatar from 'images/default_avatar.png'

import { Thumbnail, Text, Button, Icon } from 'native-base'

import IEToken from 'Core/IEToken'

class UserInfo extends React.Component {
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);
    }

    getUserInfo() {
        if (!this.props.userInfoData || !this.props.userInfoData.user) {
            return {};
        }

        return {
            userName: this.props.userInfoData.user.account.userName,
            emailAddress: this.props.userInfoData.user.emailAddress,
            name: this.props.userInfoData.user.name,
            phone: this.props.userInfoData.user.phone,
            personSignature: this.props.userInfoData.user.personSignature,
            headSculpture: this.props.userInfoData.user.headSculpture,
            realName: this.props.userInfoData.user.realName,
            idNumber: this.props.userInfoData.user.idNumber,
            address: this.props.userInfoData.user.address,
        }
    }

    logout(){
        IEToken.clearToken()
        .then(()=>{
            this.props.history.push("/Personal");
        })
    }

    render() {
        // 
        IEToken.getToken()
            .then(value => {
                if (!value) {
                    this.props.history.push("/Personal/Login");
                }
                else if (this.props.userInfoData.invalidate) {
                    this.props.getUserInfoFetch({});
                }
            })

        let userInfo = this.getUserInfo();
        let source = userInfo.headSculpture ? { uri: userInfo.headSculpture } : imgAvatar

        return (
            <View style={styles.content}>
                <View style={styles.header}>
                    <Thumbnail style={styles.headerSculpture} source={source} />
                    <View>
                        <Text>{userInfo.name || '昵称不见了'}</Text>
                        <Text style={styles.headerPersonSignature}>{userInfo.personSignature || "哎呀，用户什么都不写"}</Text>
                    </View>
                </View>
                <View style={styles.icons}>
                    <Button warning style={styles.iconsBtn} transparent>
                        <Icon name='star' type='AntDesign' />
                        <Text style={styles.iconsBtnText}>书签/收藏</Text>
                    </Button>
                    <Button success style={styles.iconsBtn} transparent>
                        <Icon name='search1' type='AntDesign' />
                        <Text style={styles.iconsBtnText}>历史记录</Text>
                    </Button>
                    <Button dark style={styles.iconsBtn} transparent>
                        <Icon name='bulb1' type='AntDesign' />
                        <Text style={styles.iconsBtnText}>夜间模式</Text>
                    </Button>
                </View>
                <View style={styles.body}>
                </View>
                <View>
                    <Button onPress={this.logout} info full>
                        <Text>退出登录</Text>
                        <Icon name='logout' type='AntDesign' />
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 20,
    },
    header: {
        padding: 10,
        flexDirection: 'row',
    },
    headerSculpture: {
        marginRight: 15,
        borderWidth: 1,
    },
    headerPersonSignature: {
        marginTop: 5,
        color: '#0008'
    },
    icons: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 30,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#0002',
    },
    iconsBtn: {
        width: '20%',
        flexDirection: 'column'
    },
    iconsBtnText: {
        marginTop: 10,
        fontSize: 8,
        color: '#0008'
    },
    body: {
        height: 300
    }
});

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        userInfoData: state.userInfoData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfoFetch: (postData) => {
            dispatch(getUserInfoFetch(postData));
        }
    }
}

const Contain = IERedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(UserInfo)

export default withRouter(Contain)