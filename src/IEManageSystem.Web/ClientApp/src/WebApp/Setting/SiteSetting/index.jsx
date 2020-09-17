import React from 'react';
import PropTypes from 'prop-types';
import RootRedux from 'Core/IEReduxs/RootRedux';
import { getSiteSettingsFetch } from 'Core/IEReduxs/Actions';
import SiteSettingManager from 'Core/SiteSettings/SiteSettingManager';
import { ieReduxFetch } from 'Core/IEReduxFetch';
import Theme from 'BaseLayout/Theme'

import { Card, Button, Input, Tag } from 'antd';
import { SaveOutlined } from '@ant-design/icons'

import './index.css'

class SiteSetting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siteSettings: this.createSetting(props)
        };
    }
    componentWillReceiveProps(props) {
        this.setState({ siteSettings: this.createSetting(props) });
    }
    createSetting(props) {
        let arr = [];
        props.siteSettingGroupConfigs.map(siteSettingGroupConfig => {
            let settings = siteSettingGroupConfig.siteSettingConfigs.map(item => {
                let siteSetting = props.siteSettingManager.getSetting(siteSettingGroupConfig.name, item.key);

                return siteSetting || { key: item.key, value: "", displayName: item.displayName, group: siteSettingGroupConfig.name };
            });

            arr = [...arr, ...settings];
        });

        return arr;
    }
    createSettingView(siteSetting) {
        return (
            <div key={siteSetting.key} className="input-group mb-3">
                <Input
                    suffix={<Tag color={Theme.primary}>{siteSetting.displayName}</Tag>}
                    placeholder={siteSetting.key}
                    value={siteSetting.value}
                    onChange={
                        event => {
                            siteSetting.value = event.currentTarget.value;
                            this.setState({});
                        }}
                />
            </div>);
    }
    createGroupSettingView(siteSettingGroupConfig) {
        let settings = this.state.siteSettings.filter(item => item.group == siteSettingGroupConfig.name);

        return (
            <Card key={siteSettingGroupConfig.name} title={siteSettingGroupConfig.displayName}>
                <div className="">
                    {settings.map(item => this.createSettingView(item))}
                </div>
                <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    onClick={() => {
                        ieReduxFetch("/api/SiteSettingManage/SetSiteSettings", {
                            siteSettings: settings
                        })
                            .then((value) => {
                                this.props.getSiteSettingsFetch();
                            });
                    }}
                >提交改变</Button>
            </Card>);
    }

    render() {
        return (
            <div className="sitesetting">
                {this.props.siteSettingGroupConfigs.map(item => this.createGroupSettingView(item))}
            </div>);
    }
}

SiteSetting.propTypes = {
    siteSettings: PropTypes.array.isRequired,
    siteSettingGroupConfigs: PropTypes.array,
    siteSettingManager: PropTypes.object.isRequired,
    getSiteSettingsFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        siteSettings: state.siteSettings,
        siteSettingGroupConfigs: SiteSettingManager.siteSettingGroupConfigs || [],
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