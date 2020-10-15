import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {MiddlewareFactory} from 'ice-common'

class IEStore  {
    ieStore = undefined;

    createIEStore(reducer) {
        var middlewares = [
            thunkMiddleware, // 这里添加了一个thunk中间件，他会处理thunk action
            ...(MiddlewareFactory.getMiddlewares())
        ];
        
        if(process.env.NODE_ENV != "production"){
            // 一个很便捷的 middleware，用来打印 action 日志
            middlewares.push(createLogger());
        }
        
        this.ieStore = createStore(
            reducer,
            applyMiddleware(...middlewares));
    }
}

export default new IEStore();