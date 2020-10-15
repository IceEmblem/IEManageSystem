import React from 'react'
import PropTypes from 'prop-types'
import Data from 'IETemplateComponents/IECard/Data'
import PicturePopupBox from 'CMSManage/PictureManage/PicturePopupBox'
import { Input, Tag, Button } from 'antd';

class DataConfig extends React.Component {
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
            <Input
                placeholder="示例：http://www.baidu.com"
                className="mb-3"
                value={this.data.link}
                onChange={(e) => {
                    this.data.link = e.currentTarget.value;
                    this.props.setData(this.data.data);
                }}
                suffix={<Tag color="#55acee">跳转链接</Tag>}
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
