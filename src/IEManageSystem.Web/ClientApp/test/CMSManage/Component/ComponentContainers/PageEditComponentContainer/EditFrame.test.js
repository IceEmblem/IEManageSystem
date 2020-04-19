import React from 'react';
import Enzyme from 'IEEnzyme';
import EditFrame from 'CMSManage/Component/ComponentContainers/PageEditCompontContainer/EditFrame';
import {ComponentSettingConfig} from 'CMSManage/Component/Components/BaseComponent';

const { shallow } = Enzyme;

const BasicSettingConfig = (props) => (<p>基本配置</p>);
const PageLeafSettingConfig = (props) => (<p>叶子配置</p>);
const pageComponent = {
    "name": "PostList",
    "sign": "4",
    "parentSign": null,
    "pageComponentBaseSetting":{
        "sortIndex": 6,
        "margin": null,
        "backgroundColor": null,
        "className": null,
        "col": "12",
        "height": "",
        "padding": "0rem"
    },
    "componentType": "PageLeafComponent",
    "pageComponentSettings": [],
    "targetPageId": 1
};
const componentSettingConfigs = [
    ComponentSettingConfig.BuildPageComponentSettingConfig("setting1", "设置1",
        (pageComponentSetting, setPageComponentSetting) => {
            return (<p>组件设置配置1</p>);
        }
    ),
    ComponentSettingConfig.BuildPageComponentSettingConfig("setting2", "设置2",
        (pageComponentSetting, setPageComponentSetting) => {
            return (<p>组件设置配置2</p>);
        }
    )
];
const editComponent = (pageComponent) => {};
const close = ()=>{};

// 初始化设置
test("init_test", () => {
    let editFrame = shallow(<EditFrame 
        basicSettingConfig={BasicSettingConfig}
        pageLeafSettingConfig={PageLeafSettingConfig}
        pageComponent={pageComponent}
        componentSettingConfigs={componentSettingConfigs}
        editComponent={editComponent}
        close={close}
        show={true}
    />);

    let instance = editFrame.instance();
    // 1个基本设置，1个页叶子设置，2个自定义设置
    expect(instance.tabs.length).toEqual(4);
    // 生成2个自定义的配置
    let state = editFrame.state();
    expect(state.pageComponent.pageComponentSettings.length).toEqual(2);

    // 默认显示的设置是基本设置
    let contentComponent = shallow(instance.getContentComponent());
    expect(contentComponent.text()).toEqual("基本配置");
});

// 选择选项卡测试
test("select_test", ()=>{
    let editFrame = shallow(<EditFrame 
        basicSettingConfig={BasicSettingConfig}
        pageLeafSettingConfig={PageLeafSettingConfig}
        pageComponent={pageComponent}
        componentSettingConfigs={componentSettingConfigs}
        editComponent={editComponent}
        close={close}
        show={true}
    />);

    let contentComponent;
    let instance = editFrame.instance();
    // 选择第2个选项卡
    editFrame.setState({selectTab: instance.tabs[1]});
    contentComponent = shallow(instance.getContentComponent());
    expect(contentComponent.text()).toEqual("叶子配置");

    // 选择第3个选项卡
    editFrame.setState({selectTab: instance.tabs[2]});
    contentComponent = shallow(instance.getContentComponent());
    expect(contentComponent.text()).toEqual("组件设置配置1");
})

// 提交测试
// 在传入时，pageComponent.pageComponentSettings为空数组
// 提交时，应该包含根据 componentSettingConfigs 生成的 pageComponentSettings 的信息
test("submit_test", ()=>{
    let submitedPageComponent;

    let editFrame = shallow(<EditFrame 
        basicSettingConfig={BasicSettingConfig}
        pageLeafSettingConfig={PageLeafSettingConfig}
        pageComponent={pageComponent}
        componentSettingConfigs={componentSettingConfigs}
        editComponent={(pageComponent)=>{submitedPageComponent = pageComponent}}
        close={close}
        show={true}
    />);

    let instance = editFrame.instance();
    instance.submit();
    expect(submitedPageComponent.pageComponentSettings.length).toEqual(2);
    expect(submitedPageComponent.pageComponentSettings[0].name).toEqual("setting1");
    expect(submitedPageComponent.pageComponentSettings[1].name).toEqual("setting2");
});

// 取消测试
// 取消后，传入的pageComponent.pageComponentSettings还是为空
// state中的pageComponent.pageComponentSettings与初始化时一致
test("cancel_test", ()=>{
    let editFrame = shallow(<EditFrame 
        basicSettingConfig={BasicSettingConfig}
        pageLeafSettingConfig={PageLeafSettingConfig}
        pageComponent={pageComponent}
        componentSettingConfigs={componentSettingConfigs}
        editComponent={(pageComponent)=>{submitedPageComponent = pageComponent}}
        close={close}
        show={true}
    />);

    let instance = editFrame.instance();
    instance.cancel();

    // 不能改变传入的 pageComponent
    expect(pageComponent.pageComponentSettings.length).toEqual(0);

    // pageComponent.pageComponentSettings与初始化时一样
    let state = editFrame.state();
    expect(state.pageComponent.pageComponentSettings.length).toEqual(2);
})