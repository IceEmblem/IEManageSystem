import React from 'react'
import PropTypes from 'prop-types'
import Data from 'IETemplateComponents/IEAudio/Data'
import { Input, Tag, Button } from 'antd';


class DataConfig extends React.Component {
    render() {
        let data = new Data(this.props.data);

        return (<div>
            <Input
                placeholder="示例：请输入音频链接"
                className="mb-3"
                value={data.url}
                onChange={(e) => {
                    data.url = e.currentTarget.value;
                    this.props.setData(data.data);
                }}
                suffix={<Tag color="#55acee">音频链接 Url</Tag>}
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
