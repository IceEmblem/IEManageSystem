import React from 'react'
import { BasePageLeafComponent } from '../../BaseComponents/BasePageLeafComponent';

import { List, Card, Pagination } from 'antd';
import Setting from './Setting'

export default class IEPostList extends BasePageLeafComponent {
    constructor(props) {
        super(props);
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    render() {
        let setting = new Setting(this.getPageComponentSetting());

        return (
            <div>
                <List
                    grid={{ column: setting.col }}
                    dataSource={this.state.pageDatas}
                    renderItem={item => {
                        return (<List.Item className="mr-1 ml-1 mb-2">
                            <Card
                                cover={<img
                                    alt={item.title}
                                    height={setting.heigth}
                                    src={item.imageList.length > 0 && item.imageList[0] ? item.imageList[0] : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}
                            >
                                <Card.Meta className="mb-2" title={item.title} description={item.describe} />
                                <Card.Meta className="mb-2" description={`标签：${item.tagList.join("，")}`} />
                                <Card.Meta className="text-right" description={new Date(item.creationTime).toLocaleDateString()} />
                            </Card>
                        </List.Item>)
                    }}
                />
                <Pagination 
                current={this.state.pageIndex} 
                total={this.state.resourceNum} 
                defaultPageSize={this.state.pageSize}
                onChange={(page, pageSize)=>{this.setState({pageIndex: page})}}
                onShowSizeChange={(current, pageSize)=>{this.setState({pageSize: pageSize})}}  />
            </div>
        )
    }
}