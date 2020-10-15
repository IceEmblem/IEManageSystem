import { AppRegistry } from 'react-native';

import React, { Suspense } from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { Provider } from 'react-redux'
import { View, Text } from 'react-native'

// 导入入口模块
import './Module'

import {ModuleFactory} from 'ice-common'
import {IEStore} from 'ice-common'
import {PageProvider} from 'ice-common'

class Start extends React.Component {
    state = {
        show: false
    }

    componentDidMount() {
        let moduleFactory = new ModuleFactory();
        moduleFactory.init().then(() => {
            this.setState({ show: true });
        })
    }

    render() {
        if (!this.state.show) {
            return <></>;
        }

        let store = IEStore.ieStore;

        const fallback = (props) => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>loading...</Text>
            </View>
        );

        return <Provider store={store}>
            <NativeRouter>
                <Suspense fallback={fallback}>
                    <Switch>
                        {PageProvider.pages.map(item => (<Route key={item.url} path={item.url} component={item.component} />))}
                    </Switch>
                </Suspense>
            </NativeRouter>
        </Provider>
    }
}

AppRegistry.registerComponent('IceEmblem', () => Start);