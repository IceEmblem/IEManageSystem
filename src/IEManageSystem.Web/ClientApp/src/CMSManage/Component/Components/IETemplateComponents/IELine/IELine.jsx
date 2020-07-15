import React from 'react'
import { BaseContentLeafComponent } from '../../BaseComponents/BaseContentLeafComponent'

import Data from './Data'
import Setting from './Setting'

import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';

export default class IELine extends BaseContentLeafComponent {
    constructor(props) {
        super(props);
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getPageComponentSetting());

        const chartData = data.getDatas().map(item => ({ month: item.x, city: item.line, temperature: Number(item.y) }))

        return (
            <Chart scale={{ temperature: { min: 0 } }} padding={[10, 20, 50, 40]} autoFit data={chartData} >
                <Line shape="smooth" position="month*temperature" color="city" />
                <Point position="month*temperature" color="city" />
                <Tooltip shared={true} />
                <Legend itemName={{
                    style: {
                        fill: "#333"
                    }
                }} />
            </Chart>
        );
    }
}