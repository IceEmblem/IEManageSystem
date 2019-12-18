import React from 'react'
import { ieReduxFetch } from 'Core/IEReduxFetch'
import ConfirmBox from 'ConfirmBox/ConfirmBox'
import IETool from 'ToolLibrary/IETool'

import PictureBox from './PictureBox';

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
    uploadImage(event) {
        let fileName = event.target.files[0].name;

        IETool.imageToBase64String(event.target.files[0], (base64) => {

            // setTimeout(this.uploadImageFetch(`${this.state.curPath}${fileName}`, base64), 1);

            let postData = {
                picWebPath: `${this.state.curPath}/${fileName}`,
                base64Image: base64
            };

            ieReduxFetch("/api/PictureManage/SavePicture", postData)
                .then(value => {
                    this.setState({isReload: true});
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
                this.setState({isReload: true});
            });
    }

    // 删除图片
    deleteImage() {
        if(!this.state.curSeletePic){
            return;
        }

        if(this.state.curSeletePic.isDir){
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
                            this.setState({isReload: true});
                        });
                }
            }
        })
    }

    // 删除目录
    deleteDir() {
        if(!this.state.curSeletePic) {
            return;
        }

        if(!this.state.curSeletePic.isDir){
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
                            this.setState({isReload: true});
                        });
                }
            }
        })
    }

    render() {
        return (
            <div className="picturemanage">
                <PictureBox 
                    selectPath={(curPath, curSeletePic)=>{this.setState({curPath:curPath, curSeletePic: curSeletePic})}}
                    isReload={this.state.isReload}
                    reloadDid={()=>{this.setState({isReload:false})}}
                />
                <div className="">
                    <div className="input-group shadow mb-2">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                                onChange={this.uploadImage}
                            />
                            <label className="custom-file-label picturemanage-bgcolor-fff0" htmlFor="inputGroupFile01">
                                添加图片
                            </label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-warning btn-block shadow mb-3" onClick={this.deleteImage}>删除图片</button>
                    <div className="input-group shadow mb-2">
                        <input type="text" className="form-control picturemanage-bgcolor-fff0" placeholder="目录名称"
                            value={this.state.addDirName}
                            onChange={
                                (event) => { this.setState({ addDirName: event.currentTarget.value }) }
                            }
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit" onClick={this.createDir}>添加目录</button>
                        </div>
                    </div>
                    <button type="button" className="btn btn-danger btn-block shadow" onClick={this.deleteDir}>删除目录</button>
                </div>
                <ConfirmBox
                    title={this.state.confirmBox.title}
                    text={this.state.confirmBox.text}
                    show={this.state.confirmBox.show}
                    backcall={this.state.confirmBox.backcall}
                    close={() => {
                        this.setState({
                            confirmBox: {
                                title: "",
                                text: "",
                                show: false,
                                backcall: () => { }
                            }
                        });
                    }}
                />
            </div>
        )
    }
}