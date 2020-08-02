import React from 'react'
import { ieReduxFetch } from 'Core/IEReduxFetch'
import IETool from 'Common/ToolLibrary/IETool'

import PictureBox from './PictureBox';

import { Upload, message, Button, Input, Modal } from 'antd';
import { UploadOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import './index.css'

export default class PictureManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否重新载入图片
            isReload: false,
            // 当前路径
            curPath: "",
            // 当前选择的图片（也可以是目录目录）
            curSeletePic: null,
            // 要添加的目录的名称
            addDirName: "",
            // 确认框数据
            confirmBox: {
                title: "",
                text: "",
                show: false,
                backcall: () => { }
            }
        };

        this.uploadImage = this.uploadImage.bind(this);
        this.createDir = this.createDir.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.deleteDir = this.deleteDir.bind(this);
    }

    // 上传图片点击事件
    uploadImage(file) {
        let fileName = file.name;

        IETool.imageToBase64String(file, (base64) => {

            // setTimeout(this.uploadImageFetch(`${this.state.curPath}${fileName}`, base64), 1);

            let postData = {
                picWebPath: `${this.state.curPath}/${fileName}`,
                base64Image: base64
            };

            ieReduxFetch("/api/PictureManage/SavePicture", postData)
                .then(value => {
                    this.setState({ isReload: true });
                });
        });
    }

    // 添加目录点击事件
    createDir() {
        let postData = {
            picWebPath: `${this.state.curPath}/${this.state.addDirName}`
        }

        ieReduxFetch("/api/PictureManage/CreateDir", postData)
            .then(value => {
                this.setState({ isReload: true });
            });
    }

    // 删除图片
    deleteImage() {
        if (!this.state.curSeletePic) {
            return;
        }

        if (this.state.curSeletePic.isDir) {
            return;
        }

        this.setState({
            confirmBox: {
                title: "确认删除图片？",
                text: `你正要删除 ${this.state.curSeletePic.name} 图片，是否删除？`,
                show: true,
                backcall: () => {
                    let postData = {
                        picWebPath: `${this.state.curPath}/${this.state.curSeletePic.name}`
                    }

                    ieReduxFetch("/api/PictureManage/DeletePicture", postData)
                        .then(value => {
                            this.setState({ isReload: true });
                        });
                }
            }
        })
    }

    // 删除目录
    deleteDir() {
        if (!this.state.curSeletePic) {
            return;
        }

        if (!this.state.curSeletePic.isDir) {
            return;
        }

        this.setState({
            confirmBox: {
                title: "确认删除目录？",
                text: `你正要删除 ${this.state.curSeletePic.name} 目录，删除该目录子文件也会一并删除，是否删除？`,
                show: true,
                backcall: () => {
                    let postData = {
                        picWebPath: `${this.state.curPath}/${this.state.curSeletePic.name}`
                    }

                    ieReduxFetch("/api/PictureManage/DeleteDir", postData)
                        .then(value => {
                            this.setState({ isReload: true });
                        });
                }
            }
        })
    }

    render() {
        return (
            <div className="picturemanage">
                <PictureBox
                    selectPath={(curPath, curSeletePic) => { this.setState({ curPath: curPath, curSeletePic: curSeletePic }) }}
                    isReload={this.state.isReload}
                    reloadDid={() => { this.setState({ isReload: false }) }}
                />
                <div className="bg-white">
                    <div className="mb-3 d-flex">
                        <Upload
                            className="w-100"
                            name='file'
                            showUploadList={false}
                            beforeUpload={(file) => {
                                this.uploadImage(file);
                                return false;
                            }}
                        >
                            <Button block>
                                <PlusCircleOutlined /> 添加图片
                            </Button>
                        </Upload>
                        <Button onClick={this.deleteImage} danger>
                            <DeleteOutlined /> 图片
                        </Button>
                    </div>
                    <div className="input-group mb-3">
                        <Input placeholder="输入目录名称"
                            value={this.state.addDirName}
                            onChange={
                                (event) => { this.setState({ addDirName: event.currentTarget.value }) }
                            }
                            style={{ padding: "0px 0px 0px 10px" }}
                            suffix={<Button icon={<PlusCircleOutlined />} type="primary" onClick={this.createDir}></Button>}
                        />
                    </div>
                    <div>
                        <Button block icon={<DeleteOutlined />} type="primary" danger onClick={this.deleteDir}>删除目录</Button>
                    </div>
                </div>
                <Modal
                    title={this.state.confirmBox.title}
                    visible={this.state.confirmBox.show}
                    onOk={()=>{
                        this.state.confirmBox.backcall();
                        this.setState({
                            confirmBox: {
                                title: "",
                                text: "",
                                show: false,
                                backcall: () => { }
                            }
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            confirmBox: {
                                title: "",
                                text: "",
                                show: false,
                                backcall: () => { }
                            }
                        });
                    }}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>{this.state.confirmBox.text}</p>
                </Modal>
            </div>
        )
    }
}