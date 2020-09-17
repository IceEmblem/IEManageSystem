import React from 'react';
import PropTypes from 'prop-types';
import Theme from 'BaseLayout/Theme'
import { ieReduxFetch } from 'Core/IEReduxFetch'

import { Tag, Card } from 'antd';
import { FolderOpenOutlined } from "@ant-design/icons"

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
        let pictureHtmls = this.state.pictures.map((item, index) => {
            // this.state.selectIndex == index && "picturemanage-picturebox-active"
            let onClick = () => {
                if (item.isDir && this.state.selectIndex == index) {
                    this.entreDir();
                    return;
                }
                this.setState({ selectIndex: index });
                this.props.selectPath(this.state.curPath, this.state.pictures[index]);
            };

            let className = this.state.selectIndex == index && "picturemanage-picturebox-active";

            let cover = item.isDir ?
                <div style={{ fontSize: "104px" }} onClick={onClick}><FolderOpenOutlined /></div> :
                <img src={item.webPath} alt="Preview" onClick={onClick} />;

            return <Card
                className={className}
                key={index + 1}
                hoverable
                cover={cover}
            >
                <Card.Meta description={item.name} />
            </Card>
        }
        );

        // 在最前面添加
        pictureHtmls.unshift(
            <Card
                key={0}
                hoverable
                cover={<div onClick={() => this.gobackDir()} style={{ fontSize: "104px" }}><FolderOpenOutlined /></div>}
            >
                <Card.Meta description={"../"} />
            </Card>
        );

        return pictureHtmls;
    }

    render() {
        // 如果需要重新载入
        if (this.props.isReload) {
            this.getFileAndDirs();
        }

        return (<div className="picturemanage-picturebox bg-white">
            <div className="w-100">
                <Tag color={Theme.primary}>
                    <span className="float-left">当前路径：</span>
                    <span className="float-left">{this.state.curPath == "" ? " > " : this.state.curPath.replace(/\//g, " > ")}
                    </span>
                </Tag>
            </div>
            <div className="d-flex justify-content-between picturemanage-picturebox-piclist">
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
    reloadDid: PropTypes.func.isRequired
}