import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IELine/Data'
import Setting from 'IETemplateComponents/IELine/Setting'

import WebView from 'react-native-webview'
import { View } from 'react-native'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    createHtml(chartData, setting) {
        return `
        <div id="canvas" style=""></div>
        <script src="https://unpkg.com/@antv/g2plot@latest/dist/g2plot.js"></script>
        <script>
            window.onload = function () {
                const xAlias = "${setting.xAlias}"
                const yAlias = "${setting.yAlias}"
                const type = "${setting.type}"
                const suffix = "${setting.suffix}"
                const lineShape = "${setting.lineShape}"
                const zhuzhuangShape = "${setting.zhuzhuangShape}"
                const dodgeOfzhuzhuang = "${setting.dodgeOfzhuzhuang}"
                const dodgeOfTiaoxing = "${setting.dodgeOfTiaoxing}"
                const data = ${JSON.stringify(chartData)}
    
                var chartConfig = {
                    data,
                    xField: 'x',
                    yField: 'y',
                    categoryField: 'x',
                    radiusField: 'y',
                    meta: {
                        x: {
                          alias: xAlias,
                        },
                        y: {
                          alias: yAlias,
                        },
                    },
                    seriesField: 'line',
                    groupField: 'line',
                    stackField: "line",
                    yAxis: {
                        label: {
                          // 数值格式化为千分位
                          formatter: val => val + suffix,
                        },
                    },
                    smooth: lineShape == "smooth"
                }
    
                var chart;
                if(type == "tx"){
                    chartConfig.xField = 'y';
                    chartConfig.yField = 'x';
                    chartConfig.xAxis = chartConfig.yAxis;
                    chartConfig.yAxis = undefined;

                    if(dodgeOfTiaoxing == "stack" || dodgeOfTiaoxing == "jitter"){
                        chart = new G2Plot.StackedBar('canvas', chartConfig)
                    }
                    else{
                        chart = new G2Plot.GroupedBar('canvas', chartConfig)
                    }
                }
                else if(type == "zz") {
                    if(zhuzhuangShape == "polar"){
                        if(dodgeOfzhuzhuang == "stack" || dodgeOfzhuzhuang == "jitter"){
                            chart = new G2Plot.StackedRose('canvas', chartConfig)
                        }
                        else{
                            chart = new G2Plot.GroupedRose('canvas', chartConfig)
                        }
                    }
                    else{
                        if(dodgeOfzhuzhuang == "stack" || dodgeOfzhuzhuang == "jitter"){
                            chart = new G2Plot.StackedColumn('canvas', chartConfig)
                        }
                        else{
                            chart = new G2Plot.GroupedColumn('canvas', chartConfig)
                        }
                    }
                }
                else{
                    if(lineShape == "hv"){
                        chart = new G2Plot.StepLine('canvas', chartConfig)
                    }
                    else{
                        chart = new G2Plot.Line('canvas', chartConfig)
                    }
                }
        
                chart.render();
            }
        </script>
        `
    }

    render() {
        let data = new Data(this.props.componentData);
        let setting = new Setting(this.getSetting("DefaultSetting"));

        const chartData = data.getDatas().map(item => ({ x: item.x, line: item.line, y: Number(item.y) }))

        return (
            <View style={[this.baseStyle, {height: '100%'}]}>
                <WebView
                    source={{ html: this.createHtml(chartData, setting) }}
                />
            </View>
        );
    }
}

export default Component;
