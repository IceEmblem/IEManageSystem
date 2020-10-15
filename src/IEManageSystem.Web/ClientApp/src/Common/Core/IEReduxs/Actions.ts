import IEToken from '../IEToken'
import Weburl from '../Weburl'

export interface FetchAction {
  // 动作类型
  type: string,
  // 发送数据或接收的数据
  data: any,
  // 错误消息
  error: string | null,
  // 是否属于 Fetch 类型
  isFetch: boolean,
  // fetch 标识
  fecthSign: number
}

// 生成请求action
export const Request = "IEFecth_Request"
export function request(postData: any) : FetchAction
{
  return {
    type: Request,
    data: postData,
    error: "",
    isFetch: true,
    fecthSign: -1
  }
}

// 生成错误action
export const ErrorAction = "IEFecth_Error"
export function error(errorMessage: string) : FetchAction
{
  return {
    type: ErrorAction,
    data: null,
    error: errorMessage,
    isFetch: true,
    fecthSign: -1
  }
}

// 清理错误
export const ClearError = "IEFecth_ClearError"
export function clearError(fecthSign: number)  : FetchAction
{
  return {
    type: ClearError,
    data: null,
    error: null,
    isFetch: true,
    fecthSign: fecthSign
  }
}

// 对响应action进行包装
function receivePack(actionType:string, data: any) : FetchAction
{
  return {
    type: actionType,
    data: data,
    error: "",
    isFetch: true,
    fecthSign: -1
  }
}

// 发生请求标识，每发生一个请求，会增加 1
var fecthSign = 0;
// 生成 ieThunkAcion，如果请求成功
// url: 请求的 url
// postData: 发送的数据
// actionType: 数据接收成功后要分发的 action 类型
// method: fetch 方法类型，默认 post
// isPackage: 结果是否有包装有，一般后端都会包装 post 请求结果（如后端返回{ success: true, message: "", result: "正真的结果数据" }）
export function createIEThunkAction(url:string, postData:any, actionType:string, method: string = 'post', isPackage: boolean = true) {
  return async function (dispatch:any) {
    let curFecthSign = fecthSign++;
    let requestAction = request(postData);
    requestAction.fecthSign = curFecthSign;
    dispatch(requestAction);

    // 生成 fetch 请求数据结果
    let token = await IEToken.getToken();
    let headers : any = {
      'Content-Type': 'application/json'
    }

    if(token && token != ""){
      headers.Authorization = "Bearer " + token;
    }

    return await fetch(Weburl.handleWeburl(url), {
      method: method,
      headers: headers,
      body: postData && JSON.stringify(postData)
    }).then(
      response => {
        // 再这里处理 html 异步请求结果，如 404 等问题
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        if(response.status == 400 || response.status == 401 || response.status == 403 || response.status == 500){
          return response.json();
        }

        const error = new Error(response.statusText);

        throw error;
      }
    ).then(
      data => {
        // 在这里处理后端的结果，如 后端返回 { success: false, message: "文章发表以达到上限", result: null }
        // 如果后端处理通过，你应该将数据返回，如 return data.result;
        // 否则，你应该抛出异常 throw new Error(data.message);
        // 后续的处理流程由框架处理
        if(!isPackage){
          return data;
        }

        if (data.success == true){
          return data.result;
        }

        if(data && data.error.validationErrors && data.error.validationErrors.length > 0){
          throw new Error(data.error.validationErrors[0].message);
        }
        
        throw new Error(data.error.message);
      }
    ).catch(
      errorData => {
        let errorAction = error(errorData.message);
        errorAction.fecthSign = curFecthSign;
        dispatch(errorAction);
        return Promise.reject(errorData.message);
      }
    ).then(
      value => {
        let receiveAction = receivePack(actionType, value);
        receiveAction.fecthSign = curFecthSign;
        dispatch(receiveAction);
        return value;
      }
    )
  }
}