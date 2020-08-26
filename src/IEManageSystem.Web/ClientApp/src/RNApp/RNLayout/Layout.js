import React from 'react'
import { View, } from 'react-native'
import { Switch, Route, withRouter } from 'react-router-native'
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'

class Layout extends React.Component {
    state={activeIndex: 0}

    constructor(props){
        super(props);

        this.navMenuComponents = MenuProvider.getNavMenuComponents();
        this.navMenuComponentsForSort = [...this.navMenuComponents].sort((l, r)=>{
            return l.baseUrl < r.baseUrl;
        })
    }

    render() {
        return (
            <Container>
                <Header searchBar>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button style={{ marginRight: 10 }} transparent>
                            <Icon name='menu' />
                        </Button>
                        {
                            NavToolProvider.getLeftComponents()
                        }
                    </Left>
                    <Body>
                    </Body>
                    <Right >
                        {
                            NavToolProvider.getRightComponents()
                        }
                    </Right>
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
                                        this.setState({activeIndex: index})
                                        this.props.history.push(item.menu.url);
                                    }
                                }
                            >
                                <Icon name={item.menu.icon} type='AntDesign' />
                            </Button>)}
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default withRouter(Layout)