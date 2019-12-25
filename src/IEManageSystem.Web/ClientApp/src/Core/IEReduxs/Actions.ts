import IEToken from '../IEToken'

export interface FetchAction {
  // 动作类型
  type: string,
  // 发送数据或接收的数据
  data: any,
  // 错误消息
  error: string,
  // 是否正在发送
  isFetch: boolean
}

// 生成请求action
export const Request = "IEFecth_Request"
export function request(postData: any) : FetchAction
{
  return {
    type: Request,
    data: postData,
    error: "",
    isFetch: true
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
    isFetch: false,
  }
}

// 清理错误
export const ClearError = "IEFecth_ClearError"
export function clearError()  : FetchAction
{
  return {
    type: ClearError,
    data: null,
    error: "",
    isFetch: false,
  }
}

// 对响应action进行包装
function receivePack(actionType:string, data: any) 
{
  return {
    type: actionType,
    data: data,
    error: "",
    isFetch: false,
  }
}

// 发生请求标识，每发生一个请求，会增加 1
var fecthSign = 0;
// 生成ieThunkAcion，如果请求成功，会分发receiveActionFun生成的动作
export function createIEThunkAction(url:string, postData:any, actionType:string) {
  return function (dispatch:any) {
    dispatch(request(postData));

    let token = IEToken.getToken();

    return fetch(url, {
      method: 'post',
      headers: {
        'Authorization': "Bearer " + token || "",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(
      response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        if(response.status == 400 || response.status == 401 || response.status == 403){
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
        dispatch(error(errorData.message));
        return Promise.reject(errorData.message);
      }
    ).then(
      value => {
        dispatch(receivePack(actionType, value))  // dispatch 响应动作
        return value;
      }
    )
  }
}

// 用户信息响应
export const UserInfoReceive = "UserInfoReceive"
export function userInfoFetch() {
  return createIEThunkAction(
    "/api/PageManage/AddContentPage",
    {},
    UserInfoReceive);
}

export const CreateTopLevelMenusReceive = "CreateTopLevelMenusReceive"
export function createTopLevelMenusFetch(){
  return createIEThunkAction(
    "/api/User/GetUserScopeAccessAuthorities",
    {},
    CreateTopLevelMenusReceive);
}

export const GetSiteSettingsReceive = "GetSiteSettingsReceive";
export function getSiteSettingsFetch(){
  return createIEThunkAction(
    "/api/SiteSettingManage/GetSiteSettings",
    {},
    GetSiteSettingsReceive);
}