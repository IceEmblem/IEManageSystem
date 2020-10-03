import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Switch, Route, withRouter } from 'react-router-native'
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Item, StyleProvider } from 'native-base'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'
import IocContainer from 'Core/IocContainer'
import ILayoutInstance from 'BaseLayout/ILayoutInstance'
import Theme from './Theme'

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
    }

    componentWillUnmount() {
        IocContainer.registerSingleIntances(ILayoutInstance, undefined);
    }

    showCustomizeView(component) {
        this.setState({ isShowCustomizeView: true, customizeView: component })
    }

    closeCustomizeView() {
        this.setState({ isShowCustomizeView: false, customizeView: undefined })
    }

    render() {
        return (
            <>
                <StyleProvider style={Theme.getTheme()}>
                    <View style={this.state.isShowCustomizeView ? styles.none : undefined}>
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
    customizeView: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0002'
    }
})

export default withRouter(Layout)