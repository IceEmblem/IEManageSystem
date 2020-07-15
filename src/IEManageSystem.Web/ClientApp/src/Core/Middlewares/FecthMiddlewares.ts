import { Request, ErrorAction, ClearError } from '../IEReduxs/Actions'

// fecth 中间件根据捕获action的值来维护 state.fecth 状态
// 除了 fecth 中间件外没有其他 Reducer 会更改 state.fecth 状态
export const fecth = (store: any) => (next: any) => (action: any) => {
    if (!action.isFetch) {
        return next(action);
    }

    let state = store.getState();
    // 如果是发送请求
    if (action.type == Request) {
        state.fecths.push({
            fecthSign: action.fecthSign,
            isFecthing: true,
            isSuccess: true,
            error: null,
            isAuthorize: true
        });

        return next(action);
    }

    // 清理错误
    if (action.type == ClearError) {
        state.fecths = state.fecths.filter(item => item.fecthSign != action.fecthSign);

        return next(action);
    }

    // 错误
    if (action.type == ErrorAction) {
        let errorFecth = state.fecths.find(e => e.fecthSign == action.fecthSign);
        errorFecth.isFecthing = false;
        errorFecth.isSuccess = false;
        errorFecth.error = action.error;

        return next(action);
    }

    // fetch 接收动作
    state.fecths = state.fecths.filter(item => item.fecthSign != action.fecthSign);

    return next(action)
}