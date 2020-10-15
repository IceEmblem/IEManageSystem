import React from 'react'
import { View, Text, StyleSheet, Platform, BackHandler } from 'react-native'
import { Switch, Route, withRouter } from 'react-router-native'
import { StyleProvider } from 'native-base'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'
import {IocContainer} from 'ice-common'
import ILayoutInstance from 'BaseLayout/ILayoutInstance'
import {Theme} from 'ice-common'

class Layout extends React.Component {
    state = {
        isShowCustomizeView: false,
        customizeView: undefined,
    }

    constructor(props) {
        super(props);

        this.navMenuComponents = MenuProvider.getNavMenuComponents();
        this.navMenuComponentsForSort = [...this.navMenuComponents].sort((l, r) => {
            return l.baseUrl < r.baseUrl ? 1 : -1;
        })

        this.showCustomizeView = this.showCustomizeView.bind(this);
        this.closeCustomizeView = this.closeCustomizeView.bind(this);
    }

    componentDidMount() {
        IocContainer.registerSingleIntances(ILayoutInstance, this);
        
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.back);
        }
    }

    componentWillUnmount() {
        IocContainer.registerSingleIntances(ILayoutInstance, undefined);

        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.back);
        }
    }

    showCustomizeView(component) {
        this.setState({ isShowCustomizeView: true, customizeView: component })
    }

    closeCustomizeView() {
        this.setState({ isShowCustomizeView: false, customizeView: undefined })
    }

    // 返回键
    back = () => {
        if(this.props.history.index <= 0){
            return false;
        }

        this.props.history.goBack()
        return true;
    }

    render() {
        return (
            <>
                <StyleProvider style={Theme.getTheme()}>
                    <View style={[styles.view, this.state.isShowCustomizeView ? styles.none : undefined]}>
                        <Switch>
                            {this.navMenuComponentsForSort.map(
                                (item, index) => <Route key={index} path={item.baseUrl} component={item.component} />)}
                        </Switch>
                    </View>
                </StyleProvider>
                <View style={!this.state.isShowCustomizeView ? styles.none : styles.customizeView}>
                    {
                        this.state.customizeView
                    }
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    none: {
        display: 'none'
    },
    view: {
        height: '100%',
        width: '100%',
    },
    customizeView: {
        height: '100%',
        width: '100%',
    }
})

export default withRouter(Layout)