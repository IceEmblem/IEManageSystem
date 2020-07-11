import React from 'react'
import { BasePageLeafComponent } from '../../BaseComponents/BasePageLeafComponent';
import { Link } from 'react-router-dom'
import { List, Card, Pagination, Button } from 'antd';
import { TrophyFilled } from '@ant-design/icons'
import './IERankingList.css'

export default class IERankingList extends BasePageLeafComponent {
    constructor(props) {
        super(props);
    }

    // 忽略父元素的刷新
    componentWillReceiveProps(nextprops){
    }

    render() {
        return (
            <div className="IERankingList">
                {this.state.pageDatas.map(item => (
                    <div className="IERankingList-item">
                        <div className="flex-grow-1">
                            <Link to={this.createUrl(item)}>{item.title}</Link>
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