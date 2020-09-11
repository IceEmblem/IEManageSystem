import React from 'react'
import PropTypes from 'prop-types'
import Data from 'IETemplateComponents/IEDrawer/Data'
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { Input, Tag, Button } from 'antd';

class DataConfig extends React.Component {
    data = null;

    state={
        isShowPicturePopupBox: false
    }

    constructor(props) {
        super(props);

        this.data = new Data(props.data);
    }

    render() {
        this.data.setData(this.props.data);

        return (<div>
            <Input
                placeholder="示例：这时一个标题"
                className="mb-3"
                value={this.data.title}
                onChange={(e) => {
                    this.data.title = e.currentTarget.value;
                    this.props.setData(this.data.data);
                }}
                suffix={<Tag color="#55acee">标题</Tag>}
            />
            <Input
                placeholder="示例：这是一个内容"
                className="mb-3"
                value={this.data.content}
                onChange={(e) => {
                    this.data.content = e.currentTarget.value;
                    this.props.setData(this.data.data);
                }}
                suffix={<Tag color="#55acee">内容</Tag>}
            />
            <div className="mb-3">
                <Input
                    placeholder="背景图片"
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
        </div>)
    }
}

DataConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default DataConfig;
