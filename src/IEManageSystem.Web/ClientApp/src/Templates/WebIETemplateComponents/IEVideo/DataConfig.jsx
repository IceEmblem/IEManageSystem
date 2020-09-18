import React from 'react'
import PropTypes from 'prop-types'
import Data from 'IETemplateComponents/IEVideo/Data'
import { Input, Tag, Button } from 'antd';
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'


class DataConfig extends React.Component {
    state = {
        isShowPicturePopupBox: false
    }

    render() {
        let data = new Data(this.props.data);

        return (<div>
            <Input
                placeholder="示例：请输入视频链接"
                className="mb-3"
                value={data.url}
                onChange={(e) => {
                    data.url = e.currentTarget.value;
                    this.props.setData(data.data);
                }}
                suffix={<Tag color="#55acee">视频链接 Url</Tag>}
            />
            <Input
                placeholder="示例：请输入视频链接"
                className="mb-3"
                value={data.url2}
                onChange={(e) => {
                    data.url2 = e.currentTarget.value;
                    this.props.setData(data.data);
                }}
                suffix={<Tag color="#55acee">备用视频链接 Url</Tag>}
            />
            <Input
                placeholder="示例：输入图片地址"
                className="mb-3"
                value={data.img}
                onChange={(e) => {
                    data.img = e.currentTarget.value;
                    this.props.setData(data.data);
                }}
                suffix={<Button size="small" type="primary" onClick={() => { this.setState({ isShowPicturePopupBox: true }) }} >未播放时图片</Button>}
            />
            <PicturePopupBox
                isShow={this.state.isShowPicturePopupBox}
                closePopupBox={() => { this.setState({ isShowPicturePopupBox: false }) }}
                selectPictruePath={(path) => {
                    data.img = path;
                    this.props.setData(data.data);
                }}
            />
        </div>)
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default DataConfig;
