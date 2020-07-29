import CmsRedux from '../../../../IEReduxs/CmsRedux'
import * as BaseComponentContainer from '../BaseComponent/ComponentContainer'
import { menuFetch } from '../../../../IEReduxs/Actions'
import MenuModel from '../../../../Models/MenuModel'

const defaultMenuData = new MenuModel({
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
})

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let baseState = BaseComponentContainer.mapStateToProps(state, ownProps);

    return {
        menu: state.menus[baseState.pageComponent.menuName] || defaultMenuData,
        isDefaultMenu: state.menus[baseState.pageComponent.menuName] == undefined,
        ...baseState,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchMenuFetch: (menuName) => {
            return dispatch(menuFetch(menuName));
        },
        ...BaseComponentContainer.mapDispatchToProps(dispatch, ownProps)
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    BaseComponentContainer.mergeProps
)

export default Contain;