import React from 'react'
import { Typography, Radio, Input } from 'antd';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default class DBConfigure extends React.Component {
    render() {
        return <div>
            <Title level={4}>数据库配置</Title>
            <div className="d-flex align-items-center mt-3">
                <div className="mr-3">
                    数据库类型
                </div>
                <div>
                    <Radio.Group buttonStyle="solid"
                        value={this.props.sqlType}
                        onChange={(value)=>this.props.setSqlType(value.target.value)}
                    >
                        <Radio.Button value="sqlite">SQLite</Radio.Button>
                        <Radio.Button value="mysql">MySql</Radio.Button>
                        <Radio.Button value="sqlserver">SQL Server</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            <div className="d-flex mt-3">
                <div className="mr-3">
                    数据库连接
                </div>
                <div className="flex-grow-1">
                    <TextArea rows={8} 
                        value={this.props.sqlConnect}
                        onChange={
                            (e)=>this.props.setSqlConnect(e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    }
}