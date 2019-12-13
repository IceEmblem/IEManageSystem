import React from 'react';
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Label,
  View,
} from 'bizcharts';
import DataSet from '@antv/data-set';

export default class Sunburst extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        value: 251,
        type: '大事例一',
        name: '子事例一',
      },
      {
        value: 1048,
        type: '大事例一',
        name: '子事例二',
      },
      {
        value: 610,
        type: '大事例二',
        name: '子事例三',
      },
      {
        value: 434,
        type: '大事例二',
        name: '子事例四',
      },
      {
        value: 335,
        type: '大事例三',
        name: '子事例五',
      },
      {
        value: 250,
        type: '大事例三',
        name: '子事例六',
      },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${(val * 100).toFixed(2)}%`;
          return val;
        },
      },
    };
    const dv1 = new DataView();
    dv1.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          scale={cols}
          height={340}
          forceFit
        >
          <Coord type="theta" radius={0.5} />
          <View data={dv1} scale={cols}>
            <Coord type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
            <Geom
              type="intervalStack"
              position="percent"
              color={[
                'name',
                [
                  '#BAE7FF',
                  '#7FC9FE',
                  '#71E3E3',
                  '#ABF5F5',
                  '#8EE0A1',
                  '#BAF5C4',
                ],
              ]}
              tooltip={[
                'name*percent',
                (item, percent) => {
                  percent = `${(percent * 100).toFixed(2)}%`;
                  return {
                    name: item,
                    value: percent,
                  };
                },
              ]}
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
              select={false}
            >
              <Label content="name" />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}
