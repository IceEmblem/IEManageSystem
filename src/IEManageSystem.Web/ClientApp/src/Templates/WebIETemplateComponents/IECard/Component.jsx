import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IECard/Data'
import { Card } from 'antd';
const { Meta } = Card;

class Component extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        return (
            <a href={data.link}>
                <Card
                    hoverable
                    title={
                        this.props.children['top']
                    }
                    cover={
                        this.props.children['middle']
                    }
                >
                    {
                        this.props.children['bottom']
                    }
                </Card>
            </a>);
    }
}

export default Component;
