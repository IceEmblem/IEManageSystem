import { createIEThunkAction } from 'Core/IEReduxs/Actions'

export const GetUserInfoReceive = "GetUserInfoReceive"
export function getUserInfoFetch(postData) {
    return createIEThunkAction(
        "/api/User/GetUserInfo",
        postData,
        value => ({
            type: GetUserInfoReceive,
            value
        })
    );
}

export const SetUserInfoReceive = "SetUserInfoReceive";
export function setUserInfoFetch(postData) {
    return createIEThunkAction(
        "/api/User/SetUserInfo",
        postData,
        value => ({
            type: SetUserInfoReceive,
            value
        })
    );
}

export const SetSafetyProblemReceive = "SetSafetyProblemReceive";
export function setSafetyProblemFetch(postData) {
    return createIEThunkAction(
        "/api/User/SetSafetyProblem",
        postData,
        value => ({
            type: SetSafetyProblemReceive,
            value
        })
    );
}

export const SetPassageReceive = "SetPassageReceive";
export function setPassageFetch(postData) {
    return createIEThunkAction(
        "/api/User/SetPassage",
        postData,
        value => ({
            type: SetPassageReceive,
            value
        })
    );
}