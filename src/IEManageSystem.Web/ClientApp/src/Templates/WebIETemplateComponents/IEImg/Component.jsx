import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IEImg/Data'
import Setting from 'IETemplateComponents/IEImg/Setting'
import { withRouter } from 'react-router-dom'
import nofindJpg from 'images/nofind480x300.jpg'
import './index.css'

class Component extends IComponent {
    constructor(props){
        super(props);

        this.click = this.click.bind(this);
    }

    click(){
        let data = new Data(this.props.componentData);

        if(this.props.interactivClick){
            this.props.interactivClick();
            return;
        }

        if(data.linkUrl){
            if(data.linkUrl.startsWith('http')){
                window.location.href = data.linkUrl
            }
            else{
                this.props.history.push(data.linkUrl);
            }

            return;
        }
    }

    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getDefaultSetting());

        let child;
        if (this.props.children.length > 0) {
            child = this.props.children[0];
        }

        let imgHeigth
        if(setting.imgHeigth){
            imgHeigth = new Number(setting.imgHeigth).valueOf();
            if (isNaN(imgHeigth)) {
                imgHeigth = setting.imgHeigth;
            }
        }
        else{
            imgHeigth = '100%'
        }

        let imgWidth
        if(setting.imgWidth){
            imgWidth = new Number(setting.imgWidth).valueOf();
            if (isNaN(imgWidth)) {
                imgWidth = setting.imgWidth;
            }
        }
        else{
            imgWidth = '100%'
        }

        return <a style={{cursor: 'pointer', position: 'relative' }} className='w-100'
            onClick={this.click}
        >
            <div className='w-100 d-flex justify-content-center'>
                <img alt="未找到图片" src={this.props.interactivText || data.imgUrl || nofindJpg} style={{ height: imgHeigth, width: imgWidth }}></img>
            </div>
            <div style={{
                left: 0,
                top: 0,
                width: '100%',
                height: setting.position == 'onimg' ? '100%' : 'auto',
                position: setting.position == 'onimg' ? 'absolute' : 'relative'
            }}
            >
                {child}
            </div>
        </a>
    }
}

export default withRouter(Component);
