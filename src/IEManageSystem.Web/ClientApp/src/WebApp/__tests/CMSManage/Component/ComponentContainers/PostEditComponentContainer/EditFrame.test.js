import React from 'react';
import Enzyme from 'IEEnzyme';
import EditFrame from 'CMSManage/Component/ComponentContainerBoxs/PostEditFrame';
import TestComponent from '../TestComponent';

const { shallow } = Enzyme;

const close = ()=>{};
const submit = (data)=>{};
const pageComponent = {
    "name": "Test",
    "sign": "2",
    "parentSign": null,
    "pageComponentBaseSetting":{
        "sortIndex": 4,
        "margin": null,
        "backgroundColor": null,
        "className": null,
        "col": "12",
        "height": "",
        "padding": "0rem"
    },
    "pageLeafSetting": null,
    "componentType": "LeafComponent",
    "pageComponentSettings": {}
};
const componentData = {
    id: 1, 
    sign: "123456", 
    singleDatas: [{
        name: "__default__",
        field1: "field1Data",
        field2: "field2Data",
        field3: null,
        field4: null,
        field5: null,
    }]
};

// 提交测试
test("submit_test", ()=>{
    let submitData;
    let editFrame = shallow(<EditFrame 
        show={true}
        close={close}
        submit={(data)=>{submitData = data}}
        pageComponent={pageComponent}
        componentData={componentData}
        componentDescribe={TestComponent}
    />);

    let state = editFrame.state();
    state.componentData.singleDatas[0].field1 = "1111";

    let instance = editFrame.instance();
    instance.submit();
    expect(submitData.singleDatas[0].field1).toEqual("1111");
})

// 取消测试
test("cancel_test",()=>{
    let editFrame = shallow(<EditFrame 
        show={true}
        close={close}
        submit={(data)=>{submitData = data}}
        pageComponent={pageComponent}
        componentData={componentData}
        componentDescribe={TestComponent}
    />);

    // 更改组件数据
    let state = editFrame.state();
    state.componentData.singleDatas[0].field1 = "1111";
    state.componentData.singleDatas[0].field2 = "2222";

    let instance = editFrame.instance();
    // 取消更改
    instance.cancel();

    // 原来的 componentData 不能被更改
    state = editFrame.state();
    expect(componentData.singleDatas[0].field1).toEqual("field1Data");
    expect(componentData.singleDatas[0].field2).toEqual("field2Data");
})