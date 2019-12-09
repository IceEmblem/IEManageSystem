import { createIEThunkAction } from 'Core/IEReduxs/Actions'

export const GetUserInfoReceive = "GetUserInfoReceive"
export function getUserInfoFetch(postData) {
    return createIEThunkAction(
        "/api/User/GetUserInfo",
        postData,
        GetUserInfoReceive
    );
}

export const SetUserInfoReceive = "SetUserInfoReceive";
export function setUserInfoFetch(postData) {
    return createIEThunkAction(
        "/api/User/SetUserInfo",
        postData,
        SetUserInfoReceive
    );
}

export const SetSafetyProblemReceive = "SetSafetyProblemReceive";
export function setSafetyProblemFetch(postData) {
    return createIEThunkAction(
        "/api/User/SetSafetyProblem",
        postData,
        SetSafetyProblemReceive
    );
}

export const SetPassageReceive = "SetPassageReceive";
export function setPassageFetch(postData) {
    return createIEThunkAction(
        "/api/User/SetPassage",
        postData,
        SetPassageReceive
    );
}