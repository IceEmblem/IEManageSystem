import React from 'react'
import IComponent from 'IETemplateComponents/IECarousel/IComponent'
import { Carousel, Typography } from 'antd';
import defaultImg from 'images/nofind.jpg'

const { Title, Paragraph } = Typography;

class Component extends IComponent {
    defaultItem(singleData, setting) {
        return <div
            style={{
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

    createItem(singleData, setting) {
        return (
            <div>
                {
                    this.props.isExitChild ?
                        <this.props.ChildComponent
                            interactivConfigFeature={this.getInteractivConfigFeature(singleData)}
                        />
                        : this.defaultItem(singleData, setting)
                }
            </div>
        );
    }

    render() {
        let data = this.getCurrentData();
        let setting = this.getCurrentSetting();

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
