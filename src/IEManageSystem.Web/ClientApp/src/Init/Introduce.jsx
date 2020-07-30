import React from 'react'
import { Carousel } from 'antd';
import { Typography } from 'antd';

import Show1 from './Show1.jpg'
import Show2 from './Show2.jpg'

const { Title, Paragraph } = Typography;

export default class Introduce extends React.Component {
    render() {
        return (
            <>
                <Title level={4}>IceEmblem CMS 介绍</Title>
                <Carousel className="p-3 bg-light" autoplay>
                    <div>
                        <img className='mx-auto' height="500px" src={Show1} alt="" />
                    </div>
                    <div>
                        <img className='mx-auto' height="500px" src={Show2} alt="" />
                    </div>
                </Carousel>
                <Paragraph>
                    IceEmblem 是一个可视化的CMS，具有多样化的组件和灵活的配置，让你的CMS不只是展示那么简单，CMS还提供了灵活的图表组件，
                    让你的站点不只是展示那么简单。
                    你可以使用 IceEmblem CMS 作为公司的官网，或者你可以把它当作一个工具。
                    如果你是一名开发者，那么开发 IceEmblem CMS 组件，你只需要了解 React 和 IceEmblem CMS 的组件设计即可
                </Paragraph>
            </>)
    }
}