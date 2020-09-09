import React from 'react'
import PropTypes from 'prop-types'
import IDataConfig from 'BaseCMSManage/Components/IETemplateComponents/IEImg/IDataConfig'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEImg/Data'
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { Input, Tag, Button, Radio } from 'antd';


class DataConfig extends IDataConfig {
    state = {
        isShowPicturePopupBox: false
    }

    render() {
        let data = new Data(this.props.data);

        return (<div className='d-flex flex-wrap'>
            <div className="col-md-12 mb-3">
                <Input
                    placeholder="图片"
                    value={data.imgUrl}
                    onChange={(e) => {
                        data.imgUrl = e.target.value;
                        this.props.setData(data.data);
                    }}
                    suffix={<Button size="small" type="primary" onClick={() => { this.setState({ isShowPicturePopupBox: true }) }} >选择图片</Button>}
                />
                <PicturePopupBox
                    isShow={this.state.isShowPicturePopupBox}
                    closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                    selectPictruePath={(path) => {
                        data.imgUrl = path;
                        this.props.setData(data.data);
                    }}
                />
            </div>
            <div className='col-md-12 mb-3'>
                <Input
                    placeholder="示例：/PostList"
                    value={data.linkUrl}
                    onChange={(e) => {
                        data.linkUrl = e.currentTarget.value;
                        this.props.setData(data.data);
                    }}
                    suffix={<Tag color="#55acee">链接 Url</Tag>}
                />
            </div>
        </div>)
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(IDataConfig, DataConfig);
