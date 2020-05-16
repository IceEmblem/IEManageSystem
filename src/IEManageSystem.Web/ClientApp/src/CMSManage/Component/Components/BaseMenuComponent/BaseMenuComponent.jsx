import { BaseComponent, BaseComponentProps } from '../BaseComponent'
import {ieReduxFetch} from 'Core/IEReduxFetch'

export class BaseMenuComponentProps extends BaseComponentProps {
    constructor(){
        super();
        this.menuName = null;
    }
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
        if(!this.props.menuName){
            return;
        }

        let postData = {
            menuName: this.props.menuName
        };

        ieReduxFetch("/api/Menu/GetMenu", postData)
        .then(value=>{
            if(value.menu == null){
                return;
            }
            
            this.setState({ menus: value.menu.menus });
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