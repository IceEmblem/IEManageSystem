import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'

import Data from 'IETemplateComponents/IELine/Data'
import Setting from 'IETemplateComponents/IELine/Setting'
import { Chart, Line, Point, Tooltip, Legend, Axis, Interval, Coord, Coordinate } from 'bizcharts';

class Component extends IComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getSetting("DefaultSetting"));

        const chartData = data.getDatas().map(item => ({ x: item.x, line: item.line, y: Number(item.y) }))

        return (
            <Chart key={setting.type} scale={{}} padding={[10, 20, 50, 40]} autoFit data={chartData} >
                <Axis
                    name="y"
                    label={{
                        formatter: val => `${val}${setting.suffix}`
                    }}
                />
                {
                    setting.iszx &&
                    (
                        <>
                            <Line shape={setting.lineShape} position="x*y" color="line" />
                            <Point position="x*y" color="line" />
                        </>
                    )
                }
                {
                    setting.iszz &&
                    (
                        <>
                            <Interval position="x*y" color="line"
                                adjust={[
                                    {
                                        type: setting.dodgeOfzhuzhuang,
                                        marginRatio: 0,
                                    },
                                ]}
                            />
                            <Coord type={setting.zhuzhuangShape} />
                        </>
                    )
                }
                {
                    setting.istx &&
                    (
                        <>
                            <Coordinate transpose />
                            <Interval position="x*y" color="line"
                                adjust={[
                                    {
                                        type: setting.dodgeOfTiaoxing,
                                        marginRatio: 0,
                                    },
                                ]}
                            />
                        </>
                    )
                }
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

export default Component;
