import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
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
        icon: 'home',
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

class MenuContain extends React.Component
{
    componentDidMount(){
        this.getMenus(this.props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.pageComponent.menuName != this.props.pageComponent.menuName){
            this.getMenus(nextProps);
        }
    }

    getMenus(props) {
        if(!props.pageComponent.menuName){
            return;
        }

        if(!props.isDefaultMenu){
            return;
        }

        props.dispatchMenuFetch();
    }

    render(){
        let {_menuComponent : Component, ...props} = this.props
        return <Component 
            {...props}
        />
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        menu: state.menus[ownProps.pageComponent.menuName] || defaultMenuData,
        isDefaultMenu: state.menus[ownProps.pageComponent.menuName] == undefined,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchMenuFetch: () => {
            return dispatch(menuFetch(ownProps.pageComponent.menuName));
        },
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
)(MenuContain)

export default (component) => (props) => {
    return <Contain 
        _menuComponent={component}
        {...props}
    />
}