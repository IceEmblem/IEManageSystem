import PropTypes from 'prop-types'
import { ieReduxFetch } from "Core/IEReduxFetch"
import { BaseComponent, BaseComponentProps } from '../BaseComponent'
import PageDataModel from '../../../../Models/PageDatas/PageDataModel'

export class PageLeafComponentProps extends BaseComponentProps {
    constructor() {
        super();
        this.pageLeafSetting = null;
    }
}


class BasePageLeafComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            pageName: this.props.pageLeafSetting.pageName,
            pageIndex: 1,
            pageSize: this.props.pageLeafSetting.pageSize,
            top: this.props.pageLeafSetting.top,
            searchKey: this.props.pageLeafSetting.searchKey,
            pageDatas: [],
            resourceNum: 0,
            invalid: false,
        }
    }

    componentDidMount() {
        this.getPageDateFetchs();
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            pageName: nextprops.pageLeafSetting.pageName,
            pageSize: nextprops.pageLeafSetting.pageSize,
            top: nextprops.pageLeafSetting.top,
            searchKey: nextprops.pageLeafSetting.searchKey,
        })
    }

    componentWillUpdate(nextProps, nextState){
        if ( nextState.pageName != this.state.pageName
            ||  nextState.pageIndex != this.state.pageIndex
            ||  nextState.pageSize != this.state.pageSize
            ||  nextState.top != this.state.top
            ||  nextState.searchKey != this.state.searchKey) 
        {
            this.setState({invalid: true});
        }
    }
    
    componentDidUpdate(){
        if(this.state.invalid){
            this.setState({invalid: false});
            this.getPageDateFetchs();
        }
    }

    getPageDateFetchs() {
        let postData = {
            pageName: this.state.pageName,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            top: this.state.top,
            searchKey: this.state.searchKey,
        }

        ieReduxFetch("/api/PageDataQuery/GetPageDatas", postData)
            .then(value => {
                this.setState({ pageDatas: value.pageDatas.map(item => new PageDataModel(item)), resourceNum: value.resourceNum  });
            });
    }
}

BasePageLeafComponent.propTypes = {
    pageLeafSetting: PropTypes.object
}

BasePageLeafComponent.defaultProps = {
};

export default BasePageLeafComponent;