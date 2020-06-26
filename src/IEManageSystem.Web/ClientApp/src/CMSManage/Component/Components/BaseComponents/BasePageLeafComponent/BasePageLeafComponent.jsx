import PropTypes from 'prop-types'
import {ieReduxFetch} from "Core/IEReduxFetch"
import { BaseComponent, BaseComponentProps } from '../BaseComponent'

export class PageLeafComponentProps extends BaseComponentProps {
    constructor(){
        super();
        this.pageLeafSetting = null;
    }
}


class BasePageLeafComponent extends BaseComponent 
{
    constructor(props) {
        super(props);

        this.state = {
            pageDatas: []
        }
    }

    componentDidMount()
    {
        this.getPageDateFetchs();
    }

    getPageDateFetchs()
    {
        if(!this.props.pageLeafSetting){
            return;
        }

        let postData = {
            pageName: this.props.pageLeafSetting.pageName,
            pageIndex: 1,
            pageSize: 5
        }

        ieReduxFetch("/api/PageDataQuery/GetPageDatas", postData)
        .then(value=>{
            this.setState({pageDatas: value.pageDatas});
        });
    }

    // 获取页面文章数据，如果没有，则返回基本组件提供的示例数据
    getPageDatasOrDemoDatas(){
        if(this.state.pageDatas.length == 0){
            return [{
                "id": 1,
                "name": "post1",
                "title": "圣战系谱"
            },
            {
                "id": 2,
                "name": "post2",
                "title": "圣魔之光石"
            },
            {
                "id": 3,
                "name": "post3",
                "title": "苍炎之轨迹"
            },
            {
                "id": 4,
                "name": "post4",
                "title": "晓之女神"
            },
            {
                "id": 5,
                "name": "post5",
                "title": "风花雪月"
            }];
        }

        return this.state.pageDatas;
    }
}

BasePageLeafComponent.propTypes = {
    pageLeafSetting: PropTypes.object
}

BasePageLeafComponent.defaultProps = {
};

export default BasePageLeafComponent;