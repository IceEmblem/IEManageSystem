import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'antd'

export default class Popup extends React.Component {
    render() {
        return (
            <Modal
                title={`${this.props.title} 信息`}
                visible={this.props.show}
                footer={false}
                onCancel={this.props.close}
            >
                
            </Modal>
        );
    }
}

PageData.propsTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    resource: PropTypes.object,
    // 0 查看，1 编辑，2 添加
    type: PropTypes.number.isRequired
}