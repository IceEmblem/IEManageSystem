import React from 'react';
import PropTypes from 'prop-types';
import RootRedux from 'Core/IEReduxs/RootRedux';
import { getSiteSettingsFetch } from 'Core/IEReduxs/Actions';
import SiteSettingManager from 'Core/SiteSettings/SiteSettingManager';
import {ieReduxFetch} from 'Core/IEReduxFetch';

import './index.css'

class SiteSetting extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            siteSettings: this.createSetting(props)
        };
    }
    componentWillReceiveProps(props){
        this.setState({siteSettings:this.createSetting(props)});
    }
    createSetting(props){
        let arr = [];
        props.siteSettingGroupConfigs.map(siteSettingGroupConfig => {
            let settings = siteSettingGroupConfig.siteSettingConfigs.map(item => {
                let siteSetting = props.siteSettingManager.getSetting(siteSettingGroupConfig.name, item.key);
    
                return siteSetting || { key: item.key, value: "", displayName: item.displayName, group: siteSettingGroupConfig.name};
            });

            arr = [...arr, ...settings];
        });

        return arr;
    }
    createSettingView(siteSetting) {
        return (
            <div key={siteSetting.key} className="input-group mb-3">
                <input type="text" className="form-control" placeholder={siteSetting.key} 
                    value={siteSetting.value}
                    onChange={
                        event => { 
                            siteSetting.value = event.currentTarget.value;
                            this.setState({});
                        }}
                />
                <div className="input-group-append">
                    <span className="input-group-text bg-info text-white border-0">{siteSetting.displayName}</span>
                </div>
            </div>);
    }
    createGroupSettingView(siteSettingGroupConfig) {
        let settings = this.state.siteSettings.filter(item => item.group == siteSettingGroupConfig.name);

        return (
            <div key={siteSettingGroupConfig.name} className="card-body">
                <h5 className="card-title">{siteSettingGroupConfig.displayName}</h5>
                <div className="card-text">
                    {settings.map(item => this.createSettingView(item))}
                </div>
                <button className="btn btn-info"
                    onClick={()=>{
                        ieReduxFetch("/api/SiteSettingManage/SetSiteSettings", {
                            siteSettings: settings
                        })
                        .then((value) => {
                            this.props.getSiteSettingsFetch();
                        });
                    }}
                >提交改变</button>
            </div>);
    }

    render() {
        return (
            <div className="sitesetting">
                <div className="card">
                    {this.props.siteSettingGroupConfigs.map(item => this.createGroupSettingView(item))}
                </div>
            </div>);
    }
}

SiteSetting.propTypes = {
    siteSettings: PropTypes.array.isRequired,
    siteSettingGroupConfigs: PropTypes.array.isRequire,
    siteSettingManager: PropTypes.object.isRequired,
    getSiteSettingsFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        siteSettings: state.siteSettings,
        siteSettingGroupConfigs: SiteSettingManager.siteSettingGroupConfigs,
        siteSettingManager: new SiteSettingManager(state.siteSettings)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSiteSettingsFetch: () => {
            dispatch(getSiteSettingsFetch());
        }
    }
}

const Container = RootRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(SiteSetting)

export default Container;