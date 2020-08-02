import React from 'react';
import { ResourceDescribeValueType } from './ResourceDescribeValueType.js';
import FormRadio from './FormRadio.jsx';
import FormCheck from './FormCheck.jsx';
import TextGroup from './TextGroup.jsx';
import Text from './Text.jsx';
import FormSelect from './FormSelect'
import RichText from './RichText'
import DataTime from './DateTime'
import './ResourceForm.css'

import { Modal, Button, Card } from 'antd';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default class ResourceForm extends React.Component {
    // props.title
    // props.resource  资源数据
    // props.describes  资源描述
    // props.isHideSubmit  是否隐藏提交按钮
    // props.resourceUpdate()  提交回调函数
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        this.resource = null;

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.initClient(this.props.resource);
    }

    componentWillReceiveProps(nextProps) {
        this.initClient(nextProps.resource);
    }

    initClient(inputResource) {
        this.resource = Object.assign({}, inputResource);

        for (let item in this.props.describes) {
            if(Array.isArray(this.resource[this.props.describes[item].name])){
                this.resource[this.props.describes[item].name] = Object.assign([], inputResource[this.props.describes[item].name]);
            }
        }
    }

    // 提交
    submit() {
        let resource = Object.assign(this.props.resource, this.resource);
        
        this.props.resourceUpdate(resource);
    }

    createElement(describe) {
        if (describe.valueType === ResourceDescribeValueType.text) {
            return (
                <div key={describe.name} name={describe.name} className={"mb-3 float-left col-md-" + describe.col}>
                    <Text
                        title={describe.text}
                        value={this.resource[describe.name]}
                        isEdit={describe.isEdit}
                        onChange={value => { this.resource[describe.name] = value; this.setState({}) }}
                    />
                </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.textGroup) {
            return (<div key={describe.name} name={describe.name} className={"mb-3 float-left col-md-" + describe.col}>
                <TextGroup
                    title={describe.text}
                    values={this.resource[describe.name]}
                    isEdit={describe.isEdit}
                    onChange={(name, values) => { this.resource[describe.name] = values; this.setState({}) }} />
            </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.radio) {
            return (<div key={describe.name} name={describe.name} className={"mb-3 float-left col-md-" + describe.col}>
                <Card size="small" title={describe.text}>
                    <FormRadio
                        name={describe.name}
                        values={describe.valueTexts}
                        isEdit={describe.isEdit}
                        selectValue={this.resource[describe.name]}
                        onChange={(name, selectValue) => { this.resource[describe.name] = selectValue; this.setState({}) }} />
                </Card>
            </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.check) {
            return (<div key={describe.name} name={describe.name} className={"mb-3 float-left col-md-" + describe.col}>
                <Card size="small" title={describe.text}>
                    <FormCheck
                        name={describe.name}
                        values={describe.valueTexts}
                        isEdit={describe.isEdit}
                        selectValues={this.resource[describe.name]}
                        onChange={(name, selectValues) => { this.resource[describe.name] = selectValues; this.setState({}) }} />
                </Card>
            </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.select) {
            return (<div key={describe.name} name={describe.name} className={"mb-3 float-left col-md-" + describe.col}>
                <FormSelect
                    title={describe.text}
                    name={describe.name}
                    values={describe.valueTexts}
                    isEdit={describe.isEdit}
                    selectValue={this.resource[describe.name]}
                    onChange={(name, selectValue) => { this.resource[describe.name] = selectValue; this.setState({}) }} />
            </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.richText) {
            return (<div key={describe.name} name={describe.name} className={"mb-3 float-left col-md-" + describe.col}>
                <RichText
                    title={describe.text}
                    isEdit={describe.isEdit}
                    value={this.resource[describe.name]}
                    onChange={(value) => { this.resource[describe.name] = value; this.setState({}) }} />
            </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.dateTime) {
            return (<div key={describe.name} name={describe.name} className={"mb-3 float-left col-md-" + describe.col}>
                <DataTime
                    title={describe.text}
                    isEdit={describe.isEdit}
                    value={this.resource[describe.name]}
                    onChange={(value) => { this.resource[describe.name] = value; this.setState({}) }} />
            </div>);
        }

        return null;
    }

    render() {
        let elements = new Array();
        for (let item in this.props.describes) {
            elements.push(this.createElement(this.props.describes[item]));
        }

        return (<Modal
            title={`${this.props.title}信息`}
            visible={this.props.show}
            footer={false}
            onCancel={this.props.close}
            width={this.props.width || 520}
        >
            <div className="w-100" style={{ display: "inline-block" }}>
                {elements}
            </div>
            <div className="modal-footer mt-3">
                <span id="dataFormError" className="text-danger"></span>
                <Button icon={<CloseCircleOutlined />} onClick={this.props.close}>关闭</Button>
                {
                    !this.props.isHideSubmit &&
                    <Button icon={<SaveOutlined />} type="primary" onClick={this.submit}>提交</Button>
                }
            </div>
        </Modal>)
    }
}