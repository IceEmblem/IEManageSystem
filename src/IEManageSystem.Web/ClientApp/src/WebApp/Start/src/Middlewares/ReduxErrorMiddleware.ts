import { message } from 'antd';

// 错误显示中间件
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