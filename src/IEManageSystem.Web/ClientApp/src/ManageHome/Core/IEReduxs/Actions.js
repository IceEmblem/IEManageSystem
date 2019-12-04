// 生成请求action
export const Request = "IEFecth_Request"
export function request(postData) {
  return {
    type: Request,
    data: postData,
    isFetch: true
  }
}

// 生成错误action
export const ErrorAction = "IEFecth_Error"
export function error(errorMessage) {
  return {
    type: ErrorAction,
    error: errorMessage,
    isFetch: false,
  }
}

// 清理错误
export const ClearError = "IEFecth_ClearError"
export function clearError(errorMessage) {
  return {
    type: ClearError,
    isFetch: false,
  }
}

// 对响应action进行包装
function receivePack(action) {
  return { ...action, ...{ isFetch: false } }
}

// 发生请求标识，每发生一个请求，会增加 1
var fecthSign = 0;
// 生成ieThunkAcion，如果请求成功，会分发receiveActionFun生成的动作
export function createIEThunkAction(url, postData, receiveActionFun) {
  return function (dispatch) {
    dispatch(request(postData));

    let token = IETool.getToken();

    return fetch(url, {
      method: 'post',
      type: "json",
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
        error.response = response;
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
        dispatch(receivePack(receiveActionFun(value)))  // dispatch 响应动作
        return value;
      }
    )
  }
}

// 用户信息响应
export const UserInfoReceive = "UserInfoReceive"
export function userInfoFetch(resource) {
  return createIEThunkAction(
    "/api/PageManage/AddContentPage",
    {},
    data => ({
      type: UserInfoReceive,
      data
    })
  );
}

export const CreateTopLevelMenusReceive = "CreateTopLevelMenusReceive"
export function createTopLevelMenusFetch(){
  return createIEThunkAction(
    "/api/User/GetUserScopeAccessAuthorities",
    {},
    value => ({
      type: CreateTopLevelMenusReceive,
      value
    })
  );
}