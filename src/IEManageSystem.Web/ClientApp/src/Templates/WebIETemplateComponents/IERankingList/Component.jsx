import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Link } from 'react-router-dom'
import { TrophyFilled, UserOutlined } from '@ant-design/icons'
import './IERankingList.css'
import { Avatar } from 'antd';

class Component extends IComponent {
    render() {
        return (
            <div className="IERankingList">
                {this.props.posts.map(item => (
                    <div className="IERankingList-item">
                        <div className="flex-grow-1">
                            {
                                item.imageList.lenght > 0 ?
                                <Avatar size="large" src={item.imageList[0]} /> :
                                <Avatar size="large" icon={<UserOutlined />} />
                            }
                            <Link className='ml-3' to={this.props.createUrl(item)}>{item.title}</Link>
                        </div>
                        <div className="IERankingList-item-icon">
                            <TrophyFilled />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Component;
