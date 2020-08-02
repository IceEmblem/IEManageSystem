import React from 'react'
import IEToken from 'Core/IEToken'

import { Tooltip, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

class SearchBoxTool extends React.Component 
{
    constructor(props){
        super(props);
        
        this.logoutClick = this.logoutClick.bind(this);
    }

    // 退出登录单击
    logoutClick() {
        IEToken.clearToken();

        this.props.history.push("/Account");
    }

    render() {
        return (
            <Tooltip placement="bottomRight" title="退出登录">
                <Button className="ml-3" onClick={this.logoutClick} type="primary" icon={<LogoutOutlined />} />
            </Tooltip>
        );
    }
}

const SearchBoxToolContain = withRouter(SearchBoxTool)

export default SearchBoxToolContain;