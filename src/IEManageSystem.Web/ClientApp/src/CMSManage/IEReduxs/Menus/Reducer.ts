import {MenuReceive} from './Action'
import {
    FetchAction
} from '../../../Core/IEReduxs/Actions'
import MenuModel from '../../Models/MenuModel'

function setMenuModel(menuData: any){
    menuData.__proto__ =  MenuModel.prototype;
    if(menuData.menus){
        menuData.menus.forEach(element => {
            setMenuModel(element);
        });
    }
}

// MenuReceive case Reducer
function menuReceive(state, action:FetchAction){
    let newState = {...state};
    newState[action.data.menu.name] = action.data.menu;
    setMenuModel(newState[action.data.menu.name]);

    return newState;
}

export default function reducer(state = {}, action) {
    if(action.type == MenuReceive){
        return menuReceive(state, action);
    }

    return state;
}