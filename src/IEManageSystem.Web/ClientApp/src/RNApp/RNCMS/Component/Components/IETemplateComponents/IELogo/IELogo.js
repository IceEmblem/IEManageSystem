import React from 'react';
import LogoImg from 'images/logo.png';

import RootRedux from 'Core/IEReduxs/RootRedux'
import SiteSettingManager from 'Core/SiteSettings/SiteSettingManager'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IELogo/IComponent'

import { Text, View, Image } from 'react-native'
import { Link } from 'react-router-native'

class IELogo extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let siteSettingManager = new SiteSettingManager(this.props.siteSettings);

        return (
            <Link 
                to='/'
                component={
                    (props)=>(
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={LogoImg} style={{width: 35, height: 35}} />
                            <Text style={{fontSize: "18px", marginLeft: '10px', fontWeight: 600}}>{siteSettingManager.getSiteName()}</Text>
                        </View>
                    )
                }
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        siteSettings: state.siteSettings
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Container = RootRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(IELogo)

export default (register) => register(IComponent, Container);
