import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'antd';
import PictureBox from './PictureBox';

// 图片弹出框
export default class PicturePopupBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否重新载入图片
            isReload: false,
            // 当前路径
            curPath: "",
            // 当前选择的图片（也可以是目录目录）
            curSeletePic: null,
        };
    }

    render() {
        return (
            <Modal
                title="图片选择"
                visible={this.props.isShow}
                zIndex={10000}
                width={800}
                onOk={() => {
                    this.props.closePopupBox();

                    if (!this.state.curSeletePic) {
                        this.props.selectPictruePath("");
                        return;
                    }

                    if (this.state.curSeletePic.isDir) {
                        this.props.selectPictruePath("");
                        return;
                    }

                    this.props.selectPictruePath(this.state.curSeletePic.webPath);
                }}
                onCancel={this.props.closePopupBox}
                okText="选择图片"
                cancelText="关闭"
            >
                <PictureBox
                    selectPath={(curPath, curSeletePic) => { this.setState({ curPath: curPath, curSeletePic: curSeletePic }) }}
                    isReload={this.state.isReload}
                    reloadDid={() => { this.setState({ isReload: false }) }}
                />
            </Modal>
        );
    }
}

PicturePopupBox.propTypes = {
    // 是否显示弹出框
    isShow: PropTypes.bool.isRequired,
    // 关闭弹出框
    closePopupBox: PropTypes.func.isRequired,
    // 选择的路径回调
    selectPictruePath: PropTypes.func.isRequired
}