import { BaseComponent, BaseComponentProps } from '../BaseComponent'
import {ieReduxFetch} from 'Core/IEReduxFetch'
import MenuModel from 'CMSManage/Models/MenuModel'

export class BaseMenuComponentProps extends BaseComponentProps {
    constructor(){
        super();
        this.menuName = null;
    }
}

export default class BaseMenuComponent extends BaseComponent {
    static _defaultMenuData = new MenuModel({
        "id": 0,
        "name": "main",
        "displayName": "主菜单",
        "menuType": "CompositeMenu",
        "menus": [
            {
                "id": 0,
                "name": "home",
                "displayName": "首页",
                "menuType": "LeafMenu",
                "menus": []
            },
            {
                "id": 0,
                "name": "post1",
                "displayName": "文章日志",
                "menuType": "LeafMenu",
                "menus": []
            },
            {
                "id": 0,
                "name": "post2",
                "displayName": "技术文档",
                "menuType": "CompositeMenu",
                "menus": [
                    {
                        "id": 0,
                        "name": "web",
                        "displayName": "站点技术",
                        "menuType": "LeafMenu"
                    },
                    {
                        "id": 0,
                        "name": "dosktop",
                        "displayName": "桌面应用",
                        "menuType": "LeafMenu"
                    }
                ]
            }
        ]
    });

    constructor(props) {
        super(props);

        this.state = {
            // 默认数据
            menu: BaseMenuComponent._defaultMenuData
        };
    }

    componentDidMount(){
        this.getMenus(this.props.menuName);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.menuName != this.props.menuName){
            this.getMenus(nextProps.menuName);
        }
    }

    getMenus(menuName) {
        if(!menuName){
            return;
        }

        let postData = {
            menuName: menuName
        };

        ieReduxFetch("/api/Menu/GetMenu", postData)
        .then(value=>{
            this.setState({ menu: new MenuModel(value.menu) });
        });
    }
}