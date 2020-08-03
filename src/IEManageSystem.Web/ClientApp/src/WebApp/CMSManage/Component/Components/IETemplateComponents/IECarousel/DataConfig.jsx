import React from 'react'
import PropTypes from 'prop-types'
import {BaseConfig} from 'CMSManage/Component/Components/BaseComponents/BaseComponent'
import Data from './Data'

import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Input, Tag, Button } from 'antd';

export default class DataConfig extends BaseConfig {
    state = {
        isShowPicturePopupBox: false,
        picturePopupBoxCallBack: (path) => { }
    }

    render() {
        let data = new Data(this.props.data);

        let items = data.getDatas().map((singleData, index) => {
            return (
                <div key={index} className="mb-5">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="font-weight-bold mb-0">{`走马灯 ${index + 1}`}</h5>
                        <Button icon={<DeleteOutlined />} className="" type="primary" danger
                            onClick={() => {
                                data.deleteSingleData(singleData.sortIndex);
                                this.setState({});
                            }}
                        >删除</Button>
                    </div>
                    <Input
                        placeholder="输入标题"
                        className="mb-3"
                        value={singleData.title}
                        onChange={(e) => {
                            singleData.title = e.currentTarget.value;
                            this.props.setData(data.componentData);
                        }}
                        prefix={<Tag color="#55acee">标题</Tag>}
                    />
                    <Input.TextArea
                        rows={4}
                        placeholder="输入内容"
                        className="mb-3"
                        value={singleData.content}
                        onChange={(e) => {
                            singleData.content = e.currentTarget.value;
                            this.props.setData(data.componentData);
                        }}
                        prefix={<Tag color="#55acee">内容</Tag>}
                    />
                    <div className="mb-3">
                        <label>请输入选择背景图片：</label>
                        <div className="input-group mb-3">
                            <Input
                                placeholder="背景图片"
                                value={singleData.img}
                                onChange={
                                    (event) => {
                                        singleData.img = event.target.value;
                                        this.props.setData(data.componentData)
                                    }
                                }
                                suffix={<Button size="small" type="primary"
                                    onClick={() => {
                                        this.setState({
                                            isShowPicturePopupBox: true,
                                            picturePopupBoxCallBack: (path) => {
                                                singleData.img = path;
                                                this.props.setData(data.componentData)
                                            }
                                        })
                                    }
                                    } >选择图片</Button>
                                }
                            />
                        </div>
                    </div>
                </div>
            );
        })

        return (<div>
            {items}
            <PicturePopupBox
                isShow={this.state.isShowPicturePopupBox}
                closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                selectPictruePath={this.state.picturePopupBoxCallBack}
            />
            <div>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                        data.createSingleData();
                        this.setState({});
                    }}
                >添加数据</Button>
            </div>
        </div>)
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}