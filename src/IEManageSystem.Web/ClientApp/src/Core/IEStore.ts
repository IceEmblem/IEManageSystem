import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import MiddlewareFactory from 'Core/Middlewares/MiddlewareFactory'
import RootRedux from 'Core/IEReduxs/RootRedux'

var ieStore:Store;
const loggerMiddleware = createLogger()

export function createIEStore() {
    ieStore = createStore(
        RootRedux.getReducer(),
        applyMiddleware(
            thunkMiddleware, // 这里添加了一个thunk中间件，他会处理thunk action
            loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
            ...(new MiddlewareFactory().getMiddlewares())
        ));
}

export function getIEStore() {
    return ieStore;
}