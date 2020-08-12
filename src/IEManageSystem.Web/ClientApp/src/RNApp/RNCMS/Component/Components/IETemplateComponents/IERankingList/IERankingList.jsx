import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IERankingList/IComponent'
import { Link } from 'react-router-dom'
import { TrophyFilled } from '@ant-design/icons'

class IERankingList extends IComponent {
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

export default (register) => register(IComponent, IERankingList);
