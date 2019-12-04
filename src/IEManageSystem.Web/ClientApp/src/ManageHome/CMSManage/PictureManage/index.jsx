import React from 'react'
import { ieReduxFetch } from 'Core/IEReduxFetch'
import ConfirmBox from 'ConfirmBox/ConfirmBox'

import Folder from './folder.png'

import './index.css'

export default class PictureManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curPath: "",
            addDirName: "",
            pictures: [],
            selectIndex: -1,
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

    componentDidMount() {
        this.getFileAndDirs();
    }

    getFileAndDirs() {
        let postData = {
            "picDirPath": this.state.curPath
        };

        ieReduxFetch("/api/PictureManage/GetFileAndDirs", postData)
            .then(value => {
                this.setState({ pictures: value.pictures, selectIndex: -1 });
            });
    }

    // 返回上一级目录
    gobackDir(){
        let picDirPath = this.state.curPath.replace(/\/[^\/]*?$/g, "");
        let postData = {
            picDirPath: picDirPath
        }

        ieReduxFetch("/api/PictureManage/GetFileAndDirs", postData)
            .then(value => {
                this.setState({ pictures: value.pictures, selectIndex: -1, curPath: picDirPath });
            });
    }

    // 进入目录
    entreDir() {
        let curSeletePic = this.state.pictures[this.state.selectIndex];
        let picDirPath = `${this.state.curPath}/${curSeletePic.name}`;
        let postData = {
            picDirPath: picDirPath
        }

        ieReduxFetch("/api/PictureManage/GetFileAndDirs", postData)
            .then(value => {
                this.setState({ pictures: value.pictures, selectIndex: -1, curPath: picDirPath });
            });
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
                    this.getFileAndDirs();
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
                this.getFileAndDirs();
            });
    }

    // 删除图片
    deleteImage() {
        if (this.state.selectIndex < 0) {
            return;
        }

        let curSeletePic = this.state.pictures[this.state.selectIndex];
        if(curSeletePic.isDir){
            return;
        }

        this.setState({
            confirmBox: {
                title: "确认删除图片？",
                text: `你正要删除 ${curSeletePic.name} 图片，是否删除？`,
                show: true,
                backcall: () => { 
                    let postData = {
                        picWebPath: `${this.state.curPath}/${curSeletePic.name}`
                    }
            
                    ieReduxFetch("/api/PictureManage/DeletePicture", postData)
                        .then(value => {
                            this.getFileAndDirs();
                        });
                }
            }
        })
    }

    // 删除目录
    deleteDir() {
        if (this.state.selectIndex < 0) {
            return;
        }

        let curSeletePic = this.state.pictures[this.state.selectIndex];
        if(!curSeletePic.isDir){
            return;
        }

        this.setState({
            confirmBox: {
                title: "确认删除目录？",
                text: `你正要删除 ${curSeletePic.name} 目录，删除该目录子文件也会一并删除，是否删除？`,
                show: true,
                backcall: () => { 
                    let postData = {
                        picWebPath: `${this.state.curPath}/${curSeletePic.name}`
                    }
            
                    ieReduxFetch("/api/PictureManage/DeleteDir", postData)
                        .then(value => {
                            this.getFileAndDirs();
                        });
                }
            }
        })
    }

    createPictureHtmls() {
        let pictureHtmls = this.state.pictures.map((item, index) => (
            <div class={`photobox photobox_type1 picturemanage-noactive ${this.state.selectIndex == index && "picturemanage-active"}`}>
                <div class="photobox__previewbox"
                    onClick={
                        () => {
                            if (item.isDir && this.state.selectIndex == index) {
                                this.entreDir();
                                return;
                            }
                            this.setState({ selectIndex: index });
                        }
                    }
                >
                    <img src={item.isDir ? Folder : item.webPath} class="photobox__preview" alt="Preview" />
                    <span class="photobox__label">{item.name}</span>
                </div>
            </div>
        )
        );

        // 在最前面添加
        pictureHtmls.unshift(
            <div class={`photobox photobox_type1 picturemanage-noactive`}>
                <div class="photobox__previewbox"
                    onClick={
                        () => {
                            this.gobackDir();
                        }
                    }
                >
                    <img src={Folder} class="photobox__preview" alt="Preview" />
                    <span class="photobox__label">../</span>
                </div>
            </div>
        );

        return pictureHtmls;
    }

    render() {
        return (
            <div className="picturemanage">
                <div className="hide-scroll">
                    <div>
                        <h5 className="clearfix bg-info text-white rounded shadow pl-3 pr-3 pt-1 pb-1">
                            <span className="float-left">当前路径：</span>
                            <small className="float-left">{this.state.curPath == "" ? " > " : this.state.curPath.replace(/\//g, " > ")}
                        </small></h5>
                        {this.createPictureHtmls()}
                    </div>
                </div>
                <div className="">
                    <div class="input-group shadow mb-2">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                                onChange={this.uploadImage}
                            />
                            <label class="custom-file-label picturemanage-bgcolor-fff0" for="inputGroupFile01">
                                添加图片
                            </label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-warning btn-block shadow mb-3" onClick={this.deleteImage}>删除图片</button>
                    <div class="input-group shadow mb-2">
                        <input type="text" class="form-control picturemanage-bgcolor-fff0" placeholder="目录名称"
                            value={this.state.addDirName}
                            onChange={
                                (event) => { this.setState({ addDirName: event.currentTarget.value }) }
                            }
                        />
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit" onClick={this.createDir}>添加目录</button>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger btn-block shadow" onClick={this.deleteDir}>删除目录</button>
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