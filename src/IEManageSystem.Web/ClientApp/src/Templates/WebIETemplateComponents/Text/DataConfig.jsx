import React from 'react'
import PropTypes from 'prop-types'
import Data from 'IETemplateComponents/Text/Data'
import { Input, Tag } from 'antd';

class DataConfig extends React.Component {
    data = null;

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
                value={this.data.text}
                onChange={(e) => {
                    this.data.text = e.currentTarget.value;
                    this.props.setData(this.data.data);
                }}
                suffix={<Tag color="#55acee">文本</Tag>}
            />
            <Input
                placeholder="示例：这时一个小标题"
                className="mb-3"
                value={this.data.smallText}
                onChange={(e) => {
                    this.data.smallText = e.currentTarget.value;
                    this.props.setData(this.data.data);
                }}
                suffix={<Tag color="#55acee">副文本</Tag>}
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
