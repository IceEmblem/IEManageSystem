import {
    GetUserInfoReceive,
    SetUserInfoReceive,
    SetSafetyProblemReceive} from './Actions'

function userInfoData(state = {
    invalidate: true
}, action:any)
{
    if(action.type == GetUserInfoReceive){
        return {
            ...action.data,
            ...{invalidate:false}
        }
    }

    if(action.type == SetUserInfoReceive){
        return {
            ...state,
            ...{invalidate:true}
        }
    }

    return state;
}

export function reducer(state:any = {}, action:any) {
    return {
        ...state,
        ...{
            userInfoData: userInfoData(state.userInfoData, action)
        }
    }
}