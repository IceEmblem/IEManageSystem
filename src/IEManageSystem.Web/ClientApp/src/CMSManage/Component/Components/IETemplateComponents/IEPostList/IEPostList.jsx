import React from 'react'
import { BasePageLeafComponent } from '../../BaseComponents/BasePageLeafComponent';

import { List, Card } from 'antd';

export default class IEPostList extends BasePageLeafComponent {
    render() {
        let posts = this.getPageDatasOrDemoDatas();

        return <List
            grid={{ column: 6 }}
            dataSource={posts}
            renderItem={item => (
                <List.Item className="mr-1 ml-1 mb-2">
                    <Card
                        cover={<img 
                            alt={item.title} 
                            src={item.imageList.length > 0 && item.imageList[0] ? item.imageList[0] : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}
                    >
                        <Card.Meta className="mb-2" title={item.title} description={item.describe} />
                        <Card.Meta className="mb-2" description={`标签：${item.tagList.join("，")}`} />
                        <Card.Meta className="text-right" description={item.creationTime} />
                    </Card>
                </List.Item>
            )}
        />
    }
}