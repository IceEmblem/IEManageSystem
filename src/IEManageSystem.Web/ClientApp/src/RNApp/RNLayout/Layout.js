import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Switch, Route, withRouter } from 'react-router-native'
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Item } from 'native-base'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'
import IocContainer from 'Core/IocContainer'
import ILayoutInstance from 'BaseLayout/ILayoutInstance'

class Layout extends React.Component {
    state = {
        activeIndex: 0,
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

    componentDidMount(){
        IocContainer.registerSingleIntances(ILayoutInstance, this);
    }

    componentWillUnmount(){
        IocContainer.registerSingleIntances(ILayoutInstance, undefined);
    }

    showCustomizeView(component){
        this.setState({isShowCustomizeView: true, customizeView: component})
    }

    closeCustomizeView(){
        this.setState({isShowCustomizeView: false, customizeView: undefined})
    }

    render() {
        return (
            <>
                <Container style={this.state.isShowCustomizeView ? styles.none : undefined}>
                    <Header>
                        <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Button style={{ marginRight: 15 }} transparent>
                                <Text><Icon style={{ color: '#fff' }} name='menu' /></Text>
                            </Button>
                            {
                                NavToolProvider.getLeftComponents()
                            }
                            {
                                NavToolProvider.getRightComponents()
                            }
                            <Button style={{ marginLeft: 15 }} small transparent>
                                <Text>
                                    <Icon type='AntDesign' style={{ color: '#fff' }} name='message1' />
                                </Text>
                            </Button>
                            <Button style={{ marginLeft: 15 }} small rounded transparent>
                                <Text>
                                    <Icon type='AntDesign' style={{ color: '#fff' }} name='ellipsis1' />
                                </Text>
                            </Button>
                        </Body>
                    </Header>
                    <Content>
                        <Switch>
                            {this.navMenuComponentsForSort.map(
                                (item, index) => <Route key={index} path={item.baseUrl} component={item.component} />)}
                        </Switch>
                    </Content>
                    <Footer>
                        <FooterTab>
                            {this.navMenuComponents.map(
                                (item, index) => <Button
                                    active={index == this.state.activeIndex}
                                    onPress={
                                        () => {
                                            this.setState({ activeIndex: index })
                                            this.props.history.push(item.menu.url);
                                        }
                                    }
                                >
                                    <Icon name={item.menu.icon} type='AntDesign' />
                                </Button>)}
                        </FooterTab>
                    </Footer>
                </Container>
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