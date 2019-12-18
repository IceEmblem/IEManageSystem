import React from 'react';
import PropTypes from 'prop-types';

import { ieReduxFetch } from 'Core/IEReduxFetch'
import Folder from './folder.png'

import './PictureBox.css';

export default class PictureBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            curPath: "",
            pictures: [],
            selectIndex: -1,
        };
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
                this.props.reloadDid();
                this.props.selectPath(this.state.curPath, null);
            });
    }

    // 返回上一级目录
    gobackDir() {
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

    createPictureHtmls() {
        let pictureHtmls = this.state.pictures.map((item, index) => (
            <div key={index+1} className={`photobox photobox_type1 picturemanage-picturebox-noactive ${this.state.selectIndex == index && "picturemanage-picturebox-active"}`}>
                <div className="photobox__previewbox"
                    onClick={
                        () => {
                            if (item.isDir && this.state.selectIndex == index) {
                                this.entreDir();
                                return;
                            }
                            this.setState({ selectIndex: index });
                            this.props.selectPath(this.state.curPath, this.state.pictures[index]);
                        }
                    }
                >
                    <img src={item.isDir ? Folder : item.webPath} className="photobox__preview" alt="Preview" />
                    <span className="photobox__label">{item.name}</span>
                </div>
            </div>
        )
        );

        // 在最前面添加
        pictureHtmls.unshift(
            <div key={0} className={`photobox photobox_type1 picturemanage-picturebox-noactive`}>
                <div className="photobox__previewbox"
                    onClick={
                        () => {
                            this.gobackDir();
                        }
                    }
                >
                    <img src={Folder} className="photobox__preview" alt="Preview" />
                    <span className="photobox__label">../</span>
                </div>
            </div>
        );

        return pictureHtmls;
    }

    render() {
        // 如果需要重新载入
        if(this.props.isReload){
            this.getFileAndDirs();
        }

        return (<div className="picturemanage-picturebox hide-scroll">
            <div>
                <h5 className="clearfix bg-info text-white rounded shadow pl-3 pr-3 pt-1 pb-1">
                    <span className="float-left">当前路径：</span>
                    <small className="float-left">{this.state.curPath == "" ? " > " : this.state.curPath.replace(/\//g, " > ")}
                    </small></h5>
                {this.createPictureHtmls()}
            </div>
        </div>);
    }
}

PictureBox.propTypes = {
    // 选择路径回调函数
    selectPath: PropTypes.func.isRequired,
    // 是否重新载入
    isReload: PropTypes.bool.isRequired,
    // 重载完成回调函数
    reloadDid: PropTypes.func.isRequire
}