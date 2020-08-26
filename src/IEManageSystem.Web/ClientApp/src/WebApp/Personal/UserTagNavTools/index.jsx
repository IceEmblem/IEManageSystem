import React from 'react'
import IERedux from 'BasePerson/IEReduxs/PersonalRedux'

import { Tag, Badge } from 'antd';
import { UserOutlined, MessageOutlined, GithubOutlined } from '@ant-design/icons';
import DefaultAvatar from 'images/default_avatar.png';

class UserTagNavTools extends React.Component {
    render() {
        let { name, headSculpture } = this.props.userInfoData.user ? this.props.userInfoData.user : {};

        return (
            <>
                <span className="">
                    <Tag icon={<UserOutlined />} color="#55acee">
                        你好，{name}
                    </Tag>
                    <img className="rounded-circle nav-avatar"
                        src={(headSculpture == null || headSculpture == "") ? DefaultAvatar : headSculpture} alt="Card image" />
                </span>
                <span>
                    <a href="https://github.com/IceEmblem/IEManageSystem" className="antlayout-nav-iconsize mr-2 " ><GithubOutlined /></a>
                </span>
                <Badge count={5}>
                    <a className="antlayout-nav-iconsize" href="javescript:void(0)" ><MessageOutlined /></a>
                </Badge>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        userInfoData: state.userInfoData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = IERedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(UserTagNavTools)

export default Contain