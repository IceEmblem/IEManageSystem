import { getIEStore } from './IEStore'
import { createIEThunkAction } from './IEReduxs/Actions'

// 默认接收
const Receive = "IEFecth_Receive"

// 使用该fetch在发送接收消息时，将会向store发送动作
export function ieReduxFetch(url:string, postData:any, method: string, isPackage: boolean) {
    let store = getIEStore();
    let ieThunkAction = createIEThunkAction(url, postData, Receive, method, isPackage);
    return ieThunkAction(store.dispatch);
}