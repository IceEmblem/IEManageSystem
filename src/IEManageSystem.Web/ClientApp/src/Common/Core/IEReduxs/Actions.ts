import IEToken from '../IEToken'

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
// 生成ieThunkAcion，如果请求成功，会分发receiveActionFun生成的动作
export function createIEThunkAction(url:string, postData:any, actionType:string) {
  return function (dispatch:any) {
    let curFecthSign = fecthSign++;
    let requestAction = request(postData);
    requestAction.fecthSign = curFecthSign;
    dispatch(requestAction);

    let headers : any = {
      'Content-Type': 'application/json'
    }
    let token = IEToken.getToken();
    if(token && token != ""){
      headers.Authorization = "Bearer " + token;
    }

    return fetch(url, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(postData)
    }).then(
      response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        if(response.status == 400 || response.status == 401 || response.status == 403 || response.status == 500){
          return response.json();
        }

        const error = new Error(response.statusText);
        // error.response = response;

        throw error;
      }
    ).then(
      data => {
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
        dispatch(receiveAction)  // dispatch 响应动作
        return value;
      }
    )
  }
}

export const GetSiteSettingsReceive = "GetSiteSettingsReceive";
export function getSiteSettingsFetch(){
  return createIEThunkAction(
    "/api/SiteSettingQuery/GetSiteSettings",
    {},
    GetSiteSettingsReceive);
}