import React from 'react'
import { Typography } from 'antd';
import { Carousel } from 'antd';

import Show3 from './Show3.jpg'
import Show4 from './Show4.jpg'
import Show5 from './Show5.jpg'

const { Title, Paragraph } = Typography;

export default class InitSite extends React.Component{
    render(){
        return (
            <div>
                <Title level={4}>配置已完成</Title>
                <Paragraph>
                    配置已完成，点击下方按钮进行初始化，初始化完成后，请立即修改密码，防止被他人盗用，默认账号密码如下：
                </Paragraph>
                <Paragraph>
                    默认超级管理员账号：SuperAdmin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 默认超级管理员密码：123456
                </Paragraph>
                <Carousel className="p-3 bg-light" autoplay>
                    <div>
                        <img className='mx-auto' height="500px" src={Show3} alt="" />
                    </div>
                    <div>
                        <img className='mx-auto' height="500px" src={Show4} alt="" />
                    </div>
                    <div>
                        <img className='mx-auto' height="500px" src={Show5} alt="" />
                    </div>
                </Carousel>
            </div>
        );
    }
}