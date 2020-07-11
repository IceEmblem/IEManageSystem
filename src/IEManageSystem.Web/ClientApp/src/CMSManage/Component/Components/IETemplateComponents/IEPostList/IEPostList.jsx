import React from 'react'
import { BasePageLeafComponent } from '../../BaseComponents/BasePageLeafComponent';
import { Link } from 'react-router-dom'
import { List, Card, Pagination, Button } from 'antd';
import Setting from './Setting'
import { spawn } from 'child_process';

export default class IEPostList extends BasePageLeafComponent {
    constructor(props) {
        super(props);
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "DefaultSetting");
    }

    render() {
        let setting = new Setting(this.getPageComponentSetting());

        return (
            <div>
                <div className="mb-3 ml-1">
                    <span>排序：</span>
                    <Button className="mr-2" type="ghost" size='small' onClick={()=>{this.setState({orderby: "Date"})}}>发表时间</Button>
                    <Button className="mr-2" type="ghost" size='small' onClick={()=>{this.setState({orderby: "Click"})}}>点击量</Button>
                    <Button className="mr-2" type="ghost" size='small' onClick={()=>{this.setState({orderby: "Score"})}}>评分</Button>
                </div>
                <List
                    grid={{ column: setting.col }}
                    dataSource={this.state.pageDatas}
                    renderItem={item => {
                        let tagDisplayNames = item.tags.map(e => e.displayName);

                        return (<List.Item className="mr-1 ml-1 mb-2">
                            <Card
                                cover={
                                    <Link to={this.createUrl(item)}>
                                        {
                                            setting.isShowImg == "true" &&
                                            <img
                                                alt={item.title}
                                                height={setting.heigth}
                                                width="100%"
                                                src={item.imageList.length > 0 && item.imageList[0] ? item.imageList[0] : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />
                                        }
                                    </Link>
                                }
                            >
                                <Link to={this.createUrl(item)}>
                                    <Card.Meta className="mb-2" title={item.title} description={item.describe || "暂无简介"} />
                                </Link>
                                <Card.Meta className="mb-2" description={
                                    <div>
                                        <span>{`评分：${item.score} | 点击量：${item.click}`}</span>
                                        <span className="float-right">{new Date(item.creationTime).toLocaleDateString()}</span>
                                    </div>

                                } />
                            </Card>
                        </List.Item>)
                    }}
                />
                <Pagination
                    current={this.state.pageIndex}
                    total={this.state.resourceNum}
                    defaultPageSize={this.state.pageSize}
                    onChange={(page, pageSize) => { this.setState({ pageIndex: page }) }}
                    onShowSizeChange={(current, pageSize) => { this.setState({ pageSize: pageSize }) }} />
            </div>
        )
    }
}