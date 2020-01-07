import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import MiddlewareFactory from 'Core/Middlewares/MiddlewareFactory'
import RootRedux from 'Core/IEReduxs/RootRedux'

var ieStore: Store;

export function createIEStore() {
    var middlewares = [
        thunkMiddleware, // 这里添加了一个thunk中间件，他会处理thunk action
        ...(new MiddlewareFactory().getMiddlewares())
    ];
    
    if(process.env.NODE_ENV != "production"){
        // 一个很便捷的 middleware，用来打印 action 日志
        middlewares.push(createLogger());
    }
    
    ieStore = createStore(
        RootRedux.getReducer(),
        applyMiddleware(...middlewares));
}

export function getIEStore() {
    return ieStore;
}