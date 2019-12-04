import React from 'react';
import { ResourceDescribeValueType } from '../ResourceForm/ResourceDescribeValueType.js';

export default class ResourceList extends React.Component {
    // props.title
    // props.resources
    // props.describes
    // props.resourceEditClick()
    // props.resourceDeleteClick()
    // props.resourceLookupClick()
    // props.hideEdit
    // props.hideDelete
    // props.customizeOperateBtns	自定义操作按钮组件
    constructor(props) {
        super(props);

        this.searchKey = "";
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
                    <button type="button" className="btn btn-info"
                        onClick={() => this.props.resourceLookupClick(resource)}>
                        <span className="oi oi-zoom-in mr-1" title="icon name" aria-hidden="true"></span>查看</button>
                    {this.props.hideEdit != true && <button type="button" className="btn btn-primary"
                        onClick={() => this.props.resourceEditClick(resource)}>
                        <span className="oi oi-pencil mr-1" title="icon name" aria-hidden="true"></span>编辑</button>}
                    {this.props.hideDelete != true && <button type="button" className="btn btn-danger"
                        onClick={() => this.props.resourceDeleteClick(resource)}>
                        <span className="oi oi-trash mr-1" title="icon name" aria-hidden="true"></span>删除</button>}
                    {this.props.customizeOperateBtns && this.props.customizeOperateBtns.map(
                        Item => <Item resource={resource}></Item>
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
            <div className="data-list w-100">
                <h6 className="d-flex justify-content-between shadow">
                    <span className="mt-auto mb-auto">
                        <span className="oi oi-list" title="icon name" aria-hidden="true"></span> {" " + this.props.title} 列表
                    </span>
                    <span>
                        <div className="input-group mb-3 margin-buttom-0">
                            <input name="searchKey" type="text" className="form-control" placeholder="Search" onChange={event => this.searchKey = event.target.value} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary btn-sm" type="submit" onClick={() => this.props.searchClick(this.searchKey)}>
                                    <span className="oi oi-magnifying-glass" title="icon name" aria-hidden="true"></span>搜索一下
                              </button>
                            </div>
                        </div>
                    </span>
                </h6>
                <table className="table table-hover table-striped shadow">
                    <thead>
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