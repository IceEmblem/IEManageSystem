import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import * as BaseComponentContainer from '../BaseComponent/ComponentContainer'
import { menuFetch } from 'BaseCMSManage/IEReduxs/Actions'
import MenuModel from 'BaseCMSManage/Models/MenuModel'

const defaultMenuData = function(){
    let root = new MenuModel();
    root.id = 0;
    root.name = "main";
    root.displayName = "主菜单";
    root.menuType = "CompositeMenu";
    root.addChildMenu({
        "id": 0,
        "name": "home",
        "displayName": "首页",
        "menuType": "LeafMenu",
        "menus": []
    });
    root.addChildMenu({
        "id": 0,
        "name": "post1",
        "displayName": "文章日志",
        "menuType": "LeafMenu",
        "menus": []
    });
    root.addChildMenu({
        "id": 0,
        "name": "post2",
        "displayName": "技术文档",
        "menuType": "LeafMenu",
        "menus": []
    });

    return root;
}()

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