import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IECarousel/Data'
import Setting from 'IETemplateComponents/IECarousel/Setting'
import { Carousel, Typography } from 'antd';
import defaultImg from 'images/nofind.jpg'

import InteractivConfigFeature, {
    InteractivConfigFeatureClickItem,
    InteractivConfigFeatureTextItem
} from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'

const { Title, Paragraph } = Typography;

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    defaultItem(singleData, setting) {
        return <div className="d-flex justify-content-center"
            style={{ backgroundImage: `url(${singleData.img || defaultImg})`, backgroundSize: "100% auto", backgroundRepeat: "no-repeat" }}>
            <div className="d-flex flex-column align-items-center justify-content-center pb-5"
                style={{ height: setting.height, width: setting.width }}>
                <Title style={{ color: setting.fontColor }} level={4}>{singleData.title}</Title>
                <Paragraph style={{ color: setting.fontColor }}>{singleData.content}</Paragraph>
            </div>
        </div>
    }

    createItem(singleData, setting) {
        return (
            <div>
                {
                    this.props.isExitChild ?
                        <this.props.ChildComponent
                            interactivConfigFeature={new InteractivConfigFeature([
                                new InteractivConfigFeatureTextItem('imgurl', '走马灯-图片Url', (data) => singleData.img || defaultImg),
                                new InteractivConfigFeatureTextItem('title', '走马灯-标题', (data) => singleData.title),
                                new InteractivConfigFeatureTextItem('content', '走马灯-内容', (data) => singleData.content),
                            ], singleData)}
                        />
                        : this.defaultItem(singleData, setting)
                }
            </div>
        );
    }

    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getSetting("DefaultSetting"));

        return (
            <div style={{ width: "0px", flexGrow: 1 }}>
                <Carousel autoplay>
                    {data.getDatas().map(item => this.createItem(item, setting))}
                </Carousel >
            </div>
        );
    }
}

export default Component;
