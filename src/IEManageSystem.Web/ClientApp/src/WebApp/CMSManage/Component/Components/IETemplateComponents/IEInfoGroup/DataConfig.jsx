import React from 'react'
import PropTypes from 'prop-types'
import IDataConfig from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/IDataConfig'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEInfoGroup/Setting'
import { Input, Tag } from 'antd';

class DataConfig extends IDataConfig {
    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    render() {
        let data = new Data(this.props.data);
        let setting = new Setting(this.getPageComponentSetting());

        return (<div>
            {
                setting.field1 &&
                <Input
                    placeholder={`请输入${setting.field1}`}
                    className="mb-3"
                    value={data.field1}
                    onChange={(e) => {
                        data.field1 = e.currentTarget.value;
                        this.props.setData(data.data);
                    }}
                    suffix={<Tag color="#55acee">{setting.field1}</Tag>}
                />
            }
            {
                setting.field2 &&
                <Input
                    placeholder={`请输入${setting.field2}`}
                    className="mb-3"
                    value={data.field2}
                    onChange={(e) => {
                        data.field2 = e.currentTarget.value;
                        this.props.setData(data.data);
                    }}
                    suffix={<Tag color="#55acee">{setting.field2}</Tag>}
                />
            }
            {
                setting.field3 &&
                <Input
                    placeholder={`请输入${setting.field3}`}
                    className="mb-3"
                    value={data.field3}
                    onChange={(e) => {
                        data.field3 = e.currentTarget.value;
                        this.props.setData(data.data);
                    }}
                    suffix={<Tag color="#55acee">{setting.field3}</Tag>}
                />
            }
            {
                setting.field4 &&
                <Input
                    placeholder={`请输入${setting.field4}`}
                    className="mb-3"
                    value={data.field4}
                    onChange={(e) => {
                        data.field4 = e.currentTarget.value;
                        this.props.setData(data.data);
                    }}
                    suffix={<Tag color="#55acee">{setting.field4}</Tag>}
                />
            }
            {
                setting.field5 &&
                <Input
                    placeholder={`请输入${setting.field5}`}
                    className="mb-3"
                    value={data.field5}
                    onChange={(e) => {
                        data.field5 = e.currentTarget.value;
                        this.props.setData(data.data);
                    }}
                    suffix={<Tag color="#55acee">{setting.field5}</Tag>}
                />
            }
        </div>)
    }
}

DataConfig.propType = {
    // IEButtondata
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(IDataConfig, DataConfig);
