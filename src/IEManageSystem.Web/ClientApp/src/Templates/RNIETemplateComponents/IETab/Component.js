import React from 'react';
import IComponent from 'IETemplateComponents/IETab/IComponent'
import { Tabs, Tab, ScrollableTab, Text } from 'native-base'

export default class Component extends IComponent {
    render() {
        return <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="Tab1">
                <Text>aaaaa</Text>
            </Tab>
            <Tab heading="Tab2">
                <Text>bbbb</Text>
            </Tab>
        </Tabs>
    }
}