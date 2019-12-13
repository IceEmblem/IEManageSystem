import React from "react";
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

export default class Columnrange extends React.Component {
  render() {
    const data = [
      {
        x: "分类一",
        y: [76, 100]
      },
      {
        x: "分类二",
        y: [56, 108]
      },
      {
        x: "分类三",
        y: [38, 129]
      },
      {
        x: "分类四",
        y: [58, 155]
      },
      {
        x: "分类五",
        y: [45, 120]
      }
    ];
    return (
      <div>
        <Chart height={300} data={data} forceFit>
          <Axis name="x" />
          <Axis name="y" />
          <Tooltip />
          <Geom type="interval" position="x*y" />
        </Chart>
      </div>
    );
  }
}
