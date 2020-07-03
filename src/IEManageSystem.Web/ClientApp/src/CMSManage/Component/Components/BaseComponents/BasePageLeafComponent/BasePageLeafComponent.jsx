import PropTypes from 'prop-types'
import {ieReduxFetch} from "Core/IEReduxFetch"
import { BaseComponent, BaseComponentProps } from '../BaseComponent'
import PageDataModel from '../../../../Models/PageDatas/PageDataModel'

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
        this.getPageDateFetchs(1);
    }

    getPageDateFetchs(pageIndex)
    {
        if(!this.props.pageLeafSetting){
            return;
        }

        let postData = {
            pageName: this.props.pageLeafSetting.pageName,
            pageIndex: pageIndex,
            pageSize: this.props.pageLeafSetting.pageSize,
            top: this.props.pageLeafSetting.top,
            searchKey: this.props.pageLeafSetting.searchKey,
        }

        ieReduxFetch("/api/PageDataQuery/GetPageDatas", postData)
        .then(value=>{
            this.setState({pageDatas: value.pageDatas.map(item=>new PageDataModel(item))});
        });
    }

    // 获取页面文章数据，如果没有，则返回基本组件提供的示例数据
    getPageDatasOrDemoDatas(){
        if(this.state.pageDatas.length == 0){
            return [].map(item=>new PageDataModel(item));
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