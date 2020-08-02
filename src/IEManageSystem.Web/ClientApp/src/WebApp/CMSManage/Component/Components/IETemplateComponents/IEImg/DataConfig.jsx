import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Data from './Data'

import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { Input, Tag, Radio, Button } from 'antd';

export default class DataConfig extends BaseConfig {
    data = null;

    state = {
        isShowPicturePopupBox: false
    }

    constructor(props) {
        super(props);

        this.data = new Data(props.data);
    }

    render() {
        this.data.setData(this.props.data);

        return (<div>
            <div className="mb-3">
                <Input
                    placeholder="图片"
                    value={this.data.imgUrl}
                    onChange={(e) => {
                        this.data.imgUrl = e.target.value;
                        this.props.setData(this.data.data);
                    }}
                    suffix={<Button size="small" type="primary" onClick={() => { this.setState({ isShowPicturePopupBox: true }) }} >选择图片</Button>}
                />
                <PicturePopupBox
                    isShow={this.state.isShowPicturePopupBox}
                    closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                    selectPictruePath={(path) => {
                        this.data.imgUrl = path;
                        this.props.setData(this.data.data);
                    }}
                />
            </div>
            <Input
                placeholder="示例：这时一个标题"
                className="mb-3"
                value={this.data.text}
                onChange={(e) => {
                    this.data.text = e.currentTarget.value;
                    this.props.setData(this.data.data);
                }}
                suffix={<Tag color="#55acee">描述文本</Tag>}
            />
        </div>)
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}