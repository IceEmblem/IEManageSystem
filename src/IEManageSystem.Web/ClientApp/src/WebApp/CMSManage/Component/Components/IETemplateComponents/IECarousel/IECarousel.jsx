import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/Setting'
import IocContainer from 'Core/IocContainer';
import { Carousel, Typography } from 'antd';
import defaultImg from 'images/nofind.jpg'

const { Title, Paragraph } = Typography;

class IECarousel extends IComponent {
    constructor(props) {
        super(props);
    }

    createItem(singleData, setting) {
        return (
            <div>
                <div className="d-flex justify-content-center"
                    style={{ backgroundImage: `url(${singleData.img || defaultImg})`, backgroundSize: "100% auto", backgroundRepeat: "no-repeat" }}>
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
        let setting = new Setting(this.getSetting("DefaultSetting"));

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

IocContainer.registerSingleIntances(IComponent, IECarousel);
