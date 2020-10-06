import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IELine/Setting'
import { Input, Tag, Radio, Card, Tabs } from 'antd';

const { TabPane } = Tabs;

class SettingConfig extends React.Component {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Input
                    placeholder="示例：线条1|线条2|线条3"
                    value={setting.lines}
                    onChange={(e) => {
                        setting.lines = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">线条名称（多线条已 | 进行分隔）</Tag>}
                />
            </div>
            <div className="mb-3">
                <Input
                    placeholder="示例：°C"
                    value={setting.suffix}
                    onChange={(e) => {
                        setting.suffix = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">后缀</Tag>}
                />
            </div>
            <div className="mb-3">
                <Input
                    placeholder="示例：X 轴别名"
                    value={setting.xAlias}
                    onChange={(e) => {
                        setting.xAlias = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">X 轴别名</Tag>}
                />
            </div>
            <div className="mb-3">
                <Input
                    placeholder="示例：Y 轴别名"
                    value={setting.yAlias}
                    onChange={(e) => {
                        setting.yAlias = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">Y 轴别名</Tag>}
                />
            </div>
            <div className="mb-3">
                <Input
                    placeholder="示例：200px"
                    value={setting.height}
                    onChange={(e) => {
                        setting.height = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">图表高度</Tag>}
                />
            </div>
            <Tabs 
                className="mb-3"
                defaultActiveKey={setting.type}
                onChange={(key) => {
                    setting.type = key;
                    this.props.setData(setting.setting);
                }}
            >
                <TabPane tab="折线图" key="zx">
                <Card title="折线图配置">
                    <div className="mb-3">
                        <span>形状：</span>
                        <Radio.Group
                            value={setting.lineShape}
                            onChange={(e) => {
                                setting.lineShape = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="">折线</Radio>
                            <Radio value="smooth">曲线</Radio>
                            <Radio value="hv">梯形</Radio>
                        </Radio.Group>

                    </div>
                </Card>
                </TabPane>
                <TabPane tab="柱状图" key="zz">
                <Card title="柱状图配置">
                    <div className="mb-3">
                        <span>形状：</span>
                        <Radio.Group
                            value={setting.zhuzhuangShape}
                            onChange={(e) => {
                                setting.zhuzhuangShape = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="">条形</Radio>
                            <Radio value="polar">圆形</Radio>
                        </Radio.Group>
                    </div>
                    <div className="mb-3">
                        <span>显示类型：</span>
                        <Radio.Group
                            value={setting.dodgeOfzhuzhuang}
                            onChange={(e) => {
                                setting.dodgeOfzhuzhuang = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="dodge">分开</Radio>
                            <Radio value="jitter">有点堆叠</Radio>
                            <Radio value="stack">堆叠</Radio>
                            <Radio value="symmetric">区间</Radio>
                        </Radio.Group>
                    </div>
                </Card>
                </TabPane>
                <TabPane tab="条形图" key="tx">
                <Card title="条形图配置">
                    <div className="mb-3">
                        <span>形状：</span>
                        <Radio.Group
                            value={setting.dodgeOfTiaoxing}
                            onChange={(e) => {
                                setting.dodgeOfTiaoxing = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="dodge">分开</Radio>
                            <Radio value="jitter">有点堆叠</Radio>
                            <Radio value="stack">堆叠</Radio>
                            <Radio value="symmetric">区间</Radio>
                        </Radio.Group>
                    </div>
                </Card>
                </TabPane>
            </Tabs>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default SettingConfig;
