import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from 'IETemplateComponents/IEPostList/Setting'
import { Link, withRouter } from 'react-router-dom'
import { List, Card, Pagination, Button } from 'antd';
import defaultImg from 'images/default_post_img.jpg'

import InteractivConfigFeature, {
    InteractivConfigFeatureClickItem,
    InteractivConfigFeatureTextItem
} from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractivConfigFeature'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    header() {
        return <div className="mb-3 ml-1">
            <span>排序：</span>
            <Button className="mr-2" type="ghost" size='small' onClick={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Date" }) }}>发表时间</Button>
            <Button className="mr-2" type="ghost" size='small' onClick={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Click" }) }}>点击量</Button>
            <Button className="mr-2" type="ghost" size='small' onClick={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Score" }) }}>评分</Button>
        </div>
    }

    listItem(item) {
        let setting = new Setting(this.getDefaultSetting());

        return (<List.Item className="mr-1 ml-1 mb-2">
            <Card
                cover={
                    <Link to={this.props.createUrl(item)}>
                        {
                            setting.isShowImg == "true" &&
                            <img
                                alt={item.title}
                                height={setting.heigth}
                                width="100%"
                                src={item.imageList.length > 0 && item.imageList[0] ? item.imageList[0] : defaultImg} />
                        }
                    </Link>
                }
            >
                <Link to={this.props.createUrl(item)}>
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
    }

    render() {
        let setting = new Setting(this.getDefaultSetting());

        let Head = this.props.ChildComponent['head'];

        let ListItem = this.props.ChildComponent['listItem'];

        return (
            <div>
                {
                    Head ?
                        <Head
                            interactivConfigFeature={new InteractivConfigFeature([
                                new InteractivConfigFeatureClickItem('sortDate', '排序-发表时间', (data) => () => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Date" }) }),
                                new InteractivConfigFeatureClickItem('sortClick', '排序-点击', (data) => () => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Click" }) }),
                                new InteractivConfigFeatureClickItem('sortScore', '排序-评分', (data) => () => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Score" }) }),
                            ])}
                        />
                        : this.header()
                }
                <List
                    grid={{ column: setting.col }}
                    dataSource={this.props.posts}
                    renderItem={item => {
                        return ListItem ?
                            <ListItem
                                interactivConfigFeature={new InteractivConfigFeature([
                                    new InteractivConfigFeatureTextItem('imgUrl', '图标地址', (data) => (data.imageList.length > 0 && data.imageList[0] ? data.imageList[0] : defaultImg)),
                                    new InteractivConfigFeatureTextItem('postTitle', '文章标题', (data) => data.title),
                                    new InteractivConfigFeatureTextItem('postDescribe', '文章描述', (data) => data.describe || "暂无简介"),
                                    new InteractivConfigFeatureTextItem('postScore', '文章评分', (data) => data.score || '0'),
                                    new InteractivConfigFeatureTextItem('postClick', '文章点击量', (data) => data.click),
                                    new InteractivConfigFeatureTextItem('postTime', '文章发表时间', (data) => new Date(data.creationTime).toLocaleDateString()),
                                    new InteractivConfigFeatureClickItem('postLink', '文章点击', (data) => ()=>{
                                        this.props.history.push(this.props.createUrl(data));
                                    }),
                                ], item)}
                            />
                            : this.listItem(item)
                    }}
                />
                <Pagination
                    className='mt-2'
                    showQuickJumper
                    current={this.props.postData.pageIndex}
                    total={this.props.resourceNum}
                    defaultPageSize={this.props.postData.pageSize}
                    onChange={(page, pageSize) => {
                        this.props.getPostFetchs({ ...this.props.postData, pageIndex: page })
                    }}
                    onShowSizeChange={(current, pageSize) => {
                        this.props.getPostFetchs({ ...this.props.postData, pageSize: pageSize })
                    }} />
            </div>
        )
    }
}

export default withRouter(Component);
