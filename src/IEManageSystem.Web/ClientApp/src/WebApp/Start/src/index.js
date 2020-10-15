import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

// 导入入口模块
import './Module'

import {ModuleFactory} from 'ice-common'
import {IEStore} from 'ice-common'
import {PageProvider} from 'ice-common'

// 部件
import Error from './Parts/Error';
import Loading from './Parts/Loading'

import 'css/bootstrap.min.css'
import 'css/open-iconic-bootstrap.min.css';
import 'css/common.css';

import './index.css';

import {Spin} from 'antd'

let moduleFactory = new ModuleFactory();
moduleFactory.init().then(()=>{

    let store = IEStore.ieStore;

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<Spin className="w-100 h-100" size="large"></Spin>}>
                    <Switch>
                        {PageProvider.pages.map(item => (<Route key={item.url} path={item.url} component={item.component} />))}
                    </Switch>
                </Suspense>
                <Error />
                <Loading />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'));
        
});