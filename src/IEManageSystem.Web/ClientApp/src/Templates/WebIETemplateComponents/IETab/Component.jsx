import React from 'react';
import IComponent from 'IETemplateComponents/IETab/IComponent'
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

class Component extends IComponent {
    creactItem(itemData) {
        return <TabPane
            tab={itemData.tab}
            key={itemData.key}
        >
            {itemData.content}
        </TabPane>
    }

    render() {
        let listDatas = [];
        this.props.children.tabs.forEach((item, index) => {
            listDatas.push({
                key: index,
                tab: item,
                content: this.props.children.contents.length > index ? this.props.children.contents[index] : undefined
            });
        });

        return (
            <Tabs defaultActiveKey="2">
                {
                    listDatas.map(item => this.creactItem(item))
                }
            </Tabs>
        );
    }
}

export default Component;
