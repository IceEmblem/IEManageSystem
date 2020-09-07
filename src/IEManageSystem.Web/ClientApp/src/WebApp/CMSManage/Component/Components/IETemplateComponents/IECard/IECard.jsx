import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IECard/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IECard/Data'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECard/Setting'
import { Card } from 'antd';
const { Meta } = Card;

class IECard extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));
        let data = new Data(this.props.componentData);

        return (
            <a href={data.link}>
                <Card
                    hoverable
                    cover={
                        <div className='d-flex justify-content-center'>
                            <img alt="未找到图片" src={data.imgUrl} height={setting.height} width={setting.width} />
                        </div>
                    }
                >
                    <Meta
                        title={data.title}
                        description={data.content} />
                </Card>
            </a>);
    }
}

export default (register) => register(IComponent, IECard);
