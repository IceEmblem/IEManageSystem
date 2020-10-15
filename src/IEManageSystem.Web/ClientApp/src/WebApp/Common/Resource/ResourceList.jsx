import React from 'react';
import { ResourceDescribeValueType } from '../ResourceForm/ResourceDescribeValueType.js';
import { Input, Button } from 'antd';
import {
    UnorderedListOutlined,
    ZoomInOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {Theme} from 'ice-common'

const { Search } = Input;

export default class ResourceList extends React.Component {
    // props.className
    // props.title
    // props.resources
    // props.describes
    // props.resourceEditClick()
    // props.resourceDeleteClick()
    // props.resourceLookupClick()
    // props.hideEdit
    // props.hideDelete
    // props.hideLookup
    // props.customizeOperateBtns	自定义操作按钮组件
    constructor(props) {
        super(props);
    }

    getShowTexts(resource, describe) {
        let texts = new Array();
        if (describe.valueType === ResourceDescribeValueType.text) {
            texts.push(resource[describe.name]);
            return texts;
        }

        if (describe.valueType === ResourceDescribeValueType.textGroup) {
            let values = resource[describe.name];
            for (let valueItem in values) {
                texts.push(values[valueItem]);
            }
            return texts;
        }

        if (describe.valueType === ResourceDescribeValueType.radio) {
            let valueTexts = describe.valueTexts;
            if (valueTexts === undefined) {
                texts.push(resource[describe.name]);
            }
            else {
                let value = resource[describe.name];

                valueTexts.map(valueText => {
                    if (valueText.value === value)
                        texts.push(valueText.text);
                });
            }
            return texts;
        }

        if (describe.valueType === ResourceDescribeValueType.check) {
            let valueTexts = describe.valueTexts;
            if (valueTexts === undefined) {
                let values = resource[describe.name];

                for (let valueItem in values) {
                    texts.push(values[valueItem]);
                }
            }
            else {
                let values = resource[describe.name];

                for (let valueItem in values) {
                    valueTexts.map(valueText => {
                        if (valueText.value === values[valueItem])
                            texts.push(valueText.text);
                    });
                }
            }
            return texts;
        }

        if (describe.valueType === ResourceDescribeValueType.select) {
            let valueTexts = describe.valueTexts;
            if (valueTexts === undefined) {
                texts.push(resource[describe.name]);
            }
            else {
                let value = resource[describe.name];

                valueTexts.map(valueText => {
                    if (valueText.value === value)
                        texts.push(valueText.text);
                });
            }
            return texts;
        }

        if (describe.valueType === ResourceDescribeValueType.dateTime) {
            texts.push(resource[describe.name]);
            return texts;
        }

        return texts;
    }

    createResourceTr(resource, describes, resourceIndex) {
        let resourceBodyTds = new Array();
        for (let describeItem in describes) {
            let showTexts = this.getShowTexts(resource, describes[describeItem]);
            let text = "";
            if (showTexts.length > 1) {
                for (let showTextItem in showTexts) {
                    text = text + "[" + showTexts[showTextItem] + "]";
                }
            }
            else if (showTexts.length == 1) {
                text = showTexts[0];
            }

            resourceBodyTds.push(<td key={describes[describeItem].name}>{text}</td>);
        }

        return (<tr key={resourceIndex}>
            {resourceBodyTds}
            <td>
                <div className="btn-group btn-group-sm">
                    {this.props.hideLookup != true &&
                        <Button className="mr-1" size="small" icon={<ZoomInOutlined />} type="primary" ghost onClick={() => this.props.resourceLookupClick(resource)}>查看</Button>}
                    {this.props.hideEdit != true &&
                        <Button className="mr-1" size="small" icon={<EditOutlined />} type="primary" onClick={() => this.props.resourceEditClick(resource)}>编辑</Button>}
                    {this.props.hideDelete != true &&
                        <Button className="mr-1" size="small" icon={<DeleteOutlined />} type="primary" danger onClick={() => this.props.resourceDeleteClick(resource)}> 删除 </Button>}
                    {this.props.customizeOperateBtns && this.props.customizeOperateBtns.map(
                        (Item, index) => (
                            <Item key={index} 
                                resource={resource}
                                resourceLookupClick={() => this.props.resourceLookupClick(resource)}
                                resourceEditClick={() => this.props.resourceEditClick(resource)}
                                resourceDeleteClick={() => this.props.resourceDeleteClick(resource)}
                            />
                        )
                    )}
                </div>
            </td>
        </tr>);
    }

    render() {
        let describes = this.props.describes;
        let resourceHeadThs = new Array();
        for (let item in describes) {
            resourceHeadThs.push(<th key={describes[item].name}>{describes[item].text}</th>);
        }
        let resourceHeadTr = <tr>
            {resourceHeadThs}
            <th key={"ieResourceListEdit"}>操作</th>
        </tr>;

        let resources = this.props.resources;
        let resourceBodyTrs = new Array();
        for (let item in resources) {
            resourceBodyTrs.push(this.createResourceTr(resources[item], describes, item));
        }

        return (
            <div className={`data-list w-100 ${this.props.className}`}>
                <h6 className="d-flex justify-content-between">
                    <span className="mt-auto mb-auto">
                        <UnorderedListOutlined /> {" " + this.props.title} 列表
                    </span>
                    <span>
                        <div className="input-group">
                            <Search placeholder="input search text" onSearch={(value) => this.props.searchClick(value)} enterButton />
                        </div>
                    </span>
                </h6>
                <table className="table table-hover">
                    <thead style={{backgroundColor: Theme.color5}}>
                        {resourceHeadTr}
                    </thead>
                    <tbody>
                        {resourceBodyTrs}
                    </tbody>
                </table>
            </div>
        );
    }
}