import React from 'react'
import { BaseContentLeafComponent } from '../../BaseComponents/BaseContentLeafComponent'

import { Carousel, Typography } from 'antd';

import Data from './Data'
import Setting from './Setting'

const { Title, Paragraph } = Typography;

class IECarousel extends BaseContentLeafComponent {
    constructor(props) {
        super(props);
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    createItem(singleData, setting) {
        return (
            <div>
                <div className="d-flex justify-content-center"
                    style={{ backgroundImage: `url(${singleData.img})`, backgroundSize: "100% auto", backgroundRepeat: "no-repeat" }}>
                    <div className="d-flex flex-column align-items-center justify-content-center pb-5"
                        style={{ height: setting.height, width: setting.width }}>
                        <Title style={{ color: setting.fontColor }} level={4}>{singleData.title}</Title>
                        <Paragraph style={{ color: setting.fontColor }}>{singleData.content}</Paragraph>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getPageComponentSetting());

        return (
            <div style={{width: "0px", flexGrow: 1}}>
                <Carousel autoplay>
                    {data.getDatas().map(item => this.createItem(item, setting))}
                </Carousel >
            </div>
        );
    }
}

IECarousel.defaultProps = {
};

export default IECarousel;