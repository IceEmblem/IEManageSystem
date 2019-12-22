import React from 'react';
import Enzyme from 'IEEnzyme';
import EditFrame from 'CMSManage/Component/ComponentContainers/PostEditComponentContainer/EditFrame';
import {ComponentDataConfig} from 'CMSManage/Component/Components/BaseContentLeafComponent';

const { shallow } = Enzyme;

const close = ()=>{};
const submit = (data)=>{};
const pageComponent = {
    "name": "Text",
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
    "targetPageId": null,
    "componentType": "LeafComponent",
    "pageComponentSettings": []
};
const componentData = undefined;
const componentDataConfig = ComponentDataConfig;

// 提交测试
test("submit_test", ()=>{
    let submitData;
    let editFrame = shallow(<EditFrame 
        show={true}
        close={close}
        submit={(data)=>{submitData = data}}
        pageComponent={pageComponent}
        componentData={componentData}
        componentDataConfig={componentDataConfig}
    />);

    editFrame.setState({field1: "field1Data"});
    let instance = editFrame.instance();
    instance.submit();
    expect(submitData.field1).toEqual("field1Data");
})

// 取消测试
test("cancel_test",()=>{
    let componentData = {
        field1: "field1Data",
        field2: "field2Data",
        field3: null,
        field4: null,
        field5: null,
    };
    let editFrame = shallow(<EditFrame 
        show={true}
        close={close}
        submit={(data)=>{submitData = data}}
        pageComponent={pageComponent}
        componentData={componentData}
        componentDataConfig={componentDataConfig}
    />);

    // 更改组件数据
    editFrame.setState({
        field1: "1",
        field2: "2",
        field3: null,
        field4: null,
        field5: null,
    });
    let instance = editFrame.instance();
    // 取消更改
    instance.cancel();

    // 原先的数据不能改变
    expect(componentData.field1).toEqual("field1Data");
    // state回复到初始化状态
    let state = editFrame.state();
    expect(state.field1).toEqual("field1Data");
    expect(state.field2).toEqual("field2Data");
})