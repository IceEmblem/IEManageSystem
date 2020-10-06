import React from 'react'
import IComponent from 'IETemplateComponents/IECarousel/IComponent'
import { Carousel, Typography } from 'antd';
import defaultImg from 'images/nofind.jpg'

const { Title, Paragraph } = Typography;

class Component extends IComponent {
    defaultItem(singleData, setting) {
        return <div
            style={{
                ...this.baseStyle,
                backgroundImage: `url(${singleData.img || defaultImg})`,
                backgroundSize: "100% auto",
                backgroundRepeat: "no-repeat",
            }}>
            <div className="d-flex justify-content-center"
                style={{
                    width: '100%', height: '100%', backgroundColor: setting.shade
                }}>
                <div className="d-flex flex-column align-items-center justify-content-center pb-5"
                    style={{
                        height: `${setting.height}px`,
                        width: `${setting.width}px`,
                    }}>
                    <Title style={{ color: setting.fontColor }} level={4}>{singleData.title}</Title>
                    <Paragraph style={{ color: setting.fontColor }}>{singleData.content}</Paragraph>
                </div>
            </div>
        </div>
    }

    render() {
        let data = this.getCurrentData();
        let setting = this.getCurrentSetting();
        let ChildComponents = this.props.children;

        return (
            <div style={{ width: "0px", flexGrow: 1 }}>
                <Carousel autoplay>
                    {
                        ChildComponents.length > 0 ?
                            ChildComponents.map(item => (<div>{item}</div>)) :
                            data.getDatas().map(item => (<div>{this.defaultItem(item, setting)}</div>))
                    }
                </Carousel >
            </div>
        );
    }
}

export default Component;
