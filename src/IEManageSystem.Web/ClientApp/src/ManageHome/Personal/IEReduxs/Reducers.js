import {
    GetUserInfoReceive,
    SetUserInfoReceive,
    SetSafetyProblemReceive} from './Actions'

function userInfoData(state = {
    invalidate: true
}, action)
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

export function reducer(state = {}, action) {
    return {
        ...state,
        ...{
            userInfoData: userInfoData(state.userInfoData, action)
        }
    }
}