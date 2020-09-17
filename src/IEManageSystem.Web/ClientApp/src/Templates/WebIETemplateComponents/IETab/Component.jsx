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
        let listDatas = this.getListDatas();

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
