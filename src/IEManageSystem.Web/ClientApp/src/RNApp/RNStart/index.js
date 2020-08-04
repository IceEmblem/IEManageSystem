import React, { Suspense } from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { Provider } from 'react-redux'
import { View, Text } from 'react-native'

// 导入入口模块
import './Module'

import ModuleFactory from 'Core/Modules/ModuleFactory'
import { getIEStore } from 'Core/IEStore'
import PageProvider from 'Core/Page/PageProvider'

let moduleFactory = new ModuleFactory();
moduleFactory.init();

let store = getIEStore();

const fallback = (props) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>loading...</Text>
    </View>
);

const Start = (props) => <Provider store={store}>
    <NativeRouter>
        <Suspense fallback={fallback}>
            <Switch>
                {PageProvider.pages.map(item => (<Route key={item.url} path={item.url} component={item.component} />))}
            </Switch>
        </Suspense>
    </NativeRouter>
</Provider>

export default Start;