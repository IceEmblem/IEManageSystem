import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

import { Button } from 'antd';
import {
    UnorderedListOutlined,
    ZoomInOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export default class CustomizeOperateBtnList extends React.Component {
    render() {
        return (
            <div>
                <Button className="mr-1" size="small" icon={<ZoomInOutlined />} type="primary" ghost onClick={this.props.resourceLookupClick}>查看</Button>
                <NavLink className="ant-btn ant-btn-sm mr-3"
                    to={`/ManageHome/CMSManage/PostEdit/${this.props.resource.pageNameLookup}/${this.props.resource.name}`}
                >
                    <EditOutlined />
                    <span>{" 浏览"}</span>
                </NavLink>
                {
                    this.props.resource.pageName && <span>
                        <Button className="mr-1" size="small" icon={<EditOutlined />} type="primary" onClick={this.props.resourceEditClick}>编辑</Button>
                        <Button className="mr-1" size="small" icon={<DeleteOutlined />} type="primary" danger onClick={this.props.resourceDeleteClick}> 删除 </Button>
                        <NavLink className="ant-btn ant-btn-sm mr-1"
                            to={`/ManageHome/CMSManage/PostEdit/${this.props.resource.pageName}/${this.props.resource.name}`}
                        >
                            <EditOutlined />
                            <span>{" 编辑文章"}</span>
                        </NavLink>
                    </span>
                }
            </div>
        )
    }
}

CustomizeOperateBtnList.propTypes = {
    resource: PropTypes.object.isRequired,
    resourceLookupClick: PropTypes.func.isRequired,
    resourceEditClick: PropTypes.func.isRequired,
    resourceDeleteClick: PropTypes.func.isRequired,
}