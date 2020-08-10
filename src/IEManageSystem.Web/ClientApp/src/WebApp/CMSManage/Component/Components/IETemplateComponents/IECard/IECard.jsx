import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECard/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IECard/Data'
import { Card } from 'antd';
const { Meta } = Card;

class IECard extends IComponent {
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

export default (register) => register(IComponent, IECard);
