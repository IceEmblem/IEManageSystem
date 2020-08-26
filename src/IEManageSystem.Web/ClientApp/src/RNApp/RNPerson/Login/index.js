import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Form, Label, Input, Item, Button, Icon, Text, CheckBox, Body } from 'native-base'
import { withRouter } from 'react-router-native'
import IEToken from 'Core/IEToken'
import {ieReduxFetch} from 'Core/IEReduxFetch'

class Login extends React.Component {
    state = {
        userName: '',
        password: '',
        isRemember: true,
    }

    constructor(props){
        super(props);

        this.login = this.login.bind(this);
    }

    login() {
        let postdata = {
            AccountID: this.state.userName,
            Password: this.state.password,
            RememberLogin: false,
            ReturnUrl: ''
        };

        ieReduxFetch("/api/Account/LoginAsync", postdata)
            .then(result => {
                IEToken.setToken(result.access_token, this.state.isRemember).then(() => {
                    // 跳转管理中心
                    this.props.history.push("/Personal/UserInfo");
                })
            })
    }

    render() {
        return (
            <Form style={styles.form}>
                <View style={[styles.inputText, styles.userNameView]}>
                    <Icon style={styles.inputIcon} name='user' type='AntDesign' />
                    <Input
                        value={this.state.userName}
                        onChange={(value) => {
                            this.setState({ userName: value.nativeEvent.text });
                        }}
                        placeholder='请输入用户名' />
                </View>
                <View style={[styles.inputText]}>
                    <Icon style={styles.inputIcon} name='key' type='AntDesign' />
                    <Input
                        value={this.state.password}
                        onChange={(value) => {
                            this.setState({ password: value.nativeEvent.text });
                        }}
                        placeholder='请输入密码' />
                </View>
                <View style={styles.checkView}>
                    <CheckBox checked={true} />
                    <Text style={styles.checkViewText}>同意 IceEmblem 用户协议</Text>
                </View>
                <View>
                    <Button onPress={this.login} info style={styles.loginBtn} block>
                        <Icon name='login' type='AntDesign' />
                        <Text>登录</Text>
                    </Button>
                </View>
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        padding: 10,
        paddingTop: 20
    },
    userNameView: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#0002'
    },
    inputText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputIcon: {
        marginRight: 5
    },
    checkView: {
        flexDirection: 'row',
        marginTop: 20
    },
    checkViewText: {
        marginLeft: 20
    },
    loginBtn: {
        marginTop: 20
    }
});

export default withRouter(Login)