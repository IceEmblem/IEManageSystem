import React from 'react';
import {Theme} from 'ice-common'
import { Tabs } from 'antd'

import './Tab.css';

const { TabPane } = Tabs;

export default class Tab extends React.Component {
    // props.tabs       []
    // props.nameField
    // props.children
    // props.selectOnclick(tab, index)
    constructor(props) {
        super(props);
    }

    render() {
        let lis = this.props.tabs.map((item, index) =>(
            <TabPane tab={item[this.props.nameField]} key={index}>
                {this.props.children}
            </TabPane>));


        return <Tabs defaultValue={0}
            onChange={(key) => {
                this.props.selectOnclick(this.props.tabs[key], key)
            }}
        >
            {
                lis
            }
        </Tabs>
    }
}