import React from 'react'
import IComponent from 'IETemplateComponents/IEPostList/IComponent'
import { Link, withRouter } from 'react-router-dom'
import { List, Card, Pagination, Button } from 'antd';
import defaultImg from 'images/default_post_img.jpg'

class Component extends IComponent {
    header() {
        return <div className="mb-3 ml-1">
            <span>排序：</span>
            <Button className="mr-2" type="ghost" size='small' onClick={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Date" }) }}>发表时间</Button>
            <Button className="mr-2" type="ghost" size='small' onClick={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Click" }) }}>点击量</Button>
            <Button className="mr-2" type="ghost" size='small' onClick={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Score" }) }}>评分</Button>
        </div>
    }

    createItem(item) {
        let setting = this.getCurrentSetting();

        return (<List.Item className="mr-1 ml-1 mb-2">
            <Card
                cover={
                    <Link to={this.props.createUrl(item)}>
                        {
                            setting.isShowImg == true &&
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

    footer() {
        return <Pagination
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
    }

    render() {
        let setting = this.getCurrentSetting();
        let Head = this.props.ChildComponent['head'];
        let ListItem = this.props.ChildComponent['listItem'];

        return (
            <div style={this.baseStyle}>
                {
                    setting.hiddenSortBtn == false &&
                    (Head ?
                        <Head interactivConfigFeature={this.getHeadInteractivConfigFeature()} />
                        : this.header())
                }
                <List
                    grid={{ column: setting.col }}
                    dataSource={this.props.posts}
                    renderItem={item => {
                        return ListItem ?
                            <ListItem 
                                interactivConfigFeature={this.getItemInteractivConfigFeature(item)} 
                                // 在这里替换掉文章的数据
                                currentPageAndPost={{
                                    ...this.props.currentPageAndPost,
                                    pageData: item,
                                }}
                            />
                            : this.createItem(item)
                    }}
                />
                {
                    setting.hiddenPageing == false && this.footer()
                }
            </div>
        )
    }
}

export default withRouter(Component);
