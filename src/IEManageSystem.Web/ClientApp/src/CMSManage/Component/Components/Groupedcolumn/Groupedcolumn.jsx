import React from "react";
import PropTypes from 'prop-types';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";


import {BaseContentLeafComponent} from '../BaseContentLeafComponent'

const pageComponentSettingName = "otherSetting"

// 柱状图
class Groupedcolumn extends BaseContentLeafComponent {

    render() {
        let pageComponentSetting = (this.props.pageComponentSettings || []).find(item=>item.name == pageComponentSettingName) || {}
        let data = [];
        let fields = [];
        if(this.props.componentData != null && this.props.componentData != undefined)
        {
            let parse = (field)=>{
                let parseData = JSON.parse(field)

                return {
                    type: parseData.type,
                    value1: parseInt(parseData.value1),
                    value2: parseInt(parseData.value2),
                }
            };

            let value1s = {
                name: pageComponentSetting.field1 || "柱1"
            };
            let value2s = {
                name: pageComponentSetting.field2 || "柱2"
            };

            if(this.props.componentData.field1){
                let parseData = parse(this.props.componentData.field1);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field2){
                let parseData = parse(this.props.componentData.field2);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field3){
                let parseData = parse(this.props.componentData.field3);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field4){
                let parseData = parse(this.props.componentData.field4);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field5){
                let parseData = parse(this.props.componentData.field5);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }

            data.push(value1s);
            data.push(value2s);
        }
        else{
            data = [
                {
                    name: pageComponentSetting.field1 || "柱1",
                    "Jan.": 18.9,
                    "Feb.": 28.8,
                    "Mar.": 39.3,
                    "Apr.": 81.4,
                    "May.": 47
                },
                {
                    name: pageComponentSetting.field2 || "柱2",
                    "Jan.": 12.4,
                    "Feb.": 23.2,
                    "Mar.": 34.5,
                    "Apr.": 99.7,
                    "May.": 52.6
                }
            ];

            fields = ["Jan.", "Feb.", "Mar.", "Apr.", "May."]
        }
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: fields,
            // 展开字段集
            key: "x",
            // key字段
            value: "y" // value字段
        });
        return (
            <div>
                <Chart height={300} data={dv} forceFit>
                    <Axis name="x" />
                    <Axis name="y" />
                    <Legend />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        position="x*y"
                        color={"name"}
                        adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32
                            }
                        ]}
                    />
                </Chart>
            </div>
        );
    }
}

export default Groupedcolumn;
