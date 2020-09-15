import { message } from 'antd';

// fecth 中间件根据捕获action的值来维护 state.fecth 状态
// 除了 fecth 中间件外没有其他 Reducer 会更改 state.fecth 状态
export default (store: any) => (next: any) => (action: any) => {
    let state = store.getState();

    try {
        return next(action);
    }
    catch(e) {
        message.error(e.message);
        return state;
    }
}