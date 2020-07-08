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
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center justify-content-center pb-5"
                    style={{ backgroundImage: "", height: setting.height, width: setting.width }}>
                    <Title style={{ color: setting.fontColor }} level={4}>{singleData.title}</Title>
                    <Paragraph style={{ color: setting.fontColor }}>{singleData.content}</Paragraph>
                </div>
            </div>
        );
    }

    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getPageComponentSetting());

        return (
            <Carousel autoplay>
                {data.getDatas().map(item => this.createItem(item, setting))}
            </Carousel >
        );
    }
}

IECarousel.defaultProps = {
};

export default IECarousel;