import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'Modal/Modal';
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
                // show={this.props.isShow}
                show={this.props.isShow}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header bg-info text-white">
                            <h4 className="modal-title">图片选择</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => { this.props.closePopupBox(); }}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <PictureBox
                                selectPath={(curPath, curSeletePic) => { this.setState({ curPath: curPath, curSeletePic: curSeletePic }) }}
                                isReload={this.state.isReload}
                                reloadDid={() => { this.setState({ isReload: false }) }}
                            />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-sm"
                                onClick={() => {
                                    this.props.closePopupBox();

                                    if(!this.state.curSeletePic){
                                        this.props.selectPictruePath("");
                                        return;
                                    }

                                    if(this.state.curSeletePic.isDir){
                                        this.props.selectPictruePath("");
                                        return;
                                    }

                                    this.props.selectPictruePath(this.state.curSeletePic.webPath);
                                }}>选择图片</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.props.closePopupBox(); }}>关闭</button>
                        </div>

                    </div>
                </div>
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