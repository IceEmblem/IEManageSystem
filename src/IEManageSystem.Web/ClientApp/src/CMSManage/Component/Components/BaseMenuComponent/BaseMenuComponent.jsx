import { BaseComponent, BaseComponentProps } from '../BaseComponent'
import {ieReduxFetch} from 'Core/IEReduxFetch'

export class BaseMenuComponentProps extends BaseComponentProps {
}

export default class BaseMenuComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            menus: []
        };
    }

    componentDidMount(){
        this.getMenus();
    }

    getMenus() {
        let postData = {
        };

        ieReduxFetch("/api/Menu/GetMenus", postData)
        .then(value=>{
            this.setState({ menus: value.menus });
        });
    }

    // 生成 url
    createUrl(menu)
    {
        let url = "/Page";
        if(!menu.pageName || menu.pageName == null){
            return url;
        }

        url = url + `/${menu.pageName}`;
        if(!menu.pageDataName || menu.pageDataName == null){
            return url;
        }

        url = url + `/${menu.pageDataName}`;
        return url;
    }
}