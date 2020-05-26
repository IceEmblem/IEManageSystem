import React from 'react'
import { BaseContentLeafComponent } from '../../BaseComponents/BaseContentLeafComponent'
import Data from './Data'
import { Card } from 'antd';
const { Meta } = Card;

export default class IECard extends BaseContentLeafComponent {
    constructor(props) {
        super(props);

        this.data = new Data(this.props.componentData);
    }

    render() {
        this.data.setData(this.props.componentData);

        return (
            <a href={this.data.link}>
                <Card
                    hoverable
                    cover={<img alt="未找到图片" src={this.data.imgUrl} />}
                >
                    <Meta
                        title={this.data.title}
                        description={this.data.content} />
                </Card>
            </a>);
    }
}