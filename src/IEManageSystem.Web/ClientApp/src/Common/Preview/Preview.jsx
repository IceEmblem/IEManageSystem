import React from 'react';

import { Tag, Input, Button } from 'antd';
import {
    UnorderedListOutlined,
    ZoomInOutlined
} from '@ant-design/icons';

import './Preview.css';

const { Search } = Input;

export default class Preview extends React.Component {
    // props.title
    // props.previewResources
    // props.textName
    // props.previewOnClick()
    // props.operationName
    constructor(props) {
        super(props);

        this.state = {
            selectPreviewResource: null
        }
    }

    render() {
        let lis = [];
        for (let item in this.props.previewResources) {
            let li = <li className={`d-flex justify-content-between`} key={item}>
                <span className="mt-auto mb-auto">{this.props.previewResources[item][this.props.textName]}</span>
                <span className="mt-auto mb-auto">
                    <Button
                        className={this.state.selectPreviewResource == this.props.previewResources[item] ? "preview-selected" : ""}
                        size="small"
                        icon={<ZoomInOutlined />}
                        onClick={() => {
                            this.props.previewOnClick(this.props.previewResources[item]);
                            this.setState({ selectPreviewResource: this.props.previewResources[item] });
                        }}
                    >{this.props.operationName}</Button>
                </span>
            </li>

            lis.push(li);
        }

        return (
            <div className="preview h-100">
                <h6 className="d-flex mb-2">
                    <Tag style={{ fontSize: "14px", lineHeight: "36px" }} className="w-100 mr-0" icon={<UnorderedListOutlined />}> {this.props.title} </Tag>
                </h6>
                <h6 className="preview-search mb-2">
                    <Search placeholder={`搜索${this.props.title}`} enterButton />
                </h6>
                <div className="">
                    <ul className="list-group">
                        {lis}
                    </ul>
                </div>
            </div>
        );
    }
}