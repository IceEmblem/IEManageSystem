import React from 'react';
import LogoImg from 'images/logo.png';

import RootRedux from 'Core/IEReduxs/RootRedux'
import SiteSettingManager from 'Core/SiteSettings/SiteSettingManager'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IELogo/IComponent'

class IELogo extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let siteSettingManager = new SiteSettingManager(this.props.siteSettings);
        return (
            <h1 className="ie-logo m-0">
                <a href="/">
                    <img alt="logo" src={LogoImg} />
                    {siteSettingManager.getSiteName()}
                </a>
            </h1>
        );
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
