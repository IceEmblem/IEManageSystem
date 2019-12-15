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

// 环图
class Donut extends BaseContentLeafComponent {
    render() {
        const { DataView } = DataSet;
        let data = [];
        if(this.props.componentData != null && this.props.componentData != undefined)
        {
            let parse = (field)=>{
                let parseData = JSON.parse(field)

                return {
                    type: parseData.type,
                    value: parseInt(parseData.value)
                }
            };

            if(this.props.componentData.field1){
                data.push(parse(this.props.componentData.field1));
            }
            if(this.props.componentData.field2){
                data.push(parse(this.props.componentData.field2));
            }
            if(this.props.componentData.field3){
                data.push(parse(this.props.componentData.field3));
            }
            if(this.props.componentData.field4){
                data.push(parse(this.props.componentData.field4));
            }
            if(this.props.componentData.field5){
                data.push(parse(this.props.componentData.field5));
            }
        }
        else{
            data = [
                {
                    type: "事例一",
                    value: 40
                },
                {
                    type: "事例二",
                    value: 30
                },
                {
                    type: "事例三",
                    value: 20
                },
                {
                    type: "事例四",
                    value: 10
                },
                {
                    type: "事例五",
                    value: 0
                }
            ];
        }
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "value",
            dimension: "type",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = val * 100 + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <Chart
                    height={300}
                    data={dv}
                    scale={cols}
                    padding={[0, 0, 0, 0]}
                    forceFit
                >
                    <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                    <Axis name="percent" />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="type"
                        tooltip={[
                            "type*percent",
                            (type, percent) => {
                                percent = percent * 100 + "%";
                                return {
                                    name: type,
                                    value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val, item) => {
                                return item.point.type + ": " + val;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default Donut;

