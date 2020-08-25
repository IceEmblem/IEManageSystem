import React from 'react'
import { View } from 'react-native'
import { Switch, Route, withRouter } from 'react-router-native'
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'

class Layout extends React.Component {
    constructor(props) {
        super(props);
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
                        {MenuProvider.getNavMenuComponents().map(
                            (item, index) => <Route key={index} path={item.baseUrl} component={item.component} />)}
                    </Switch>
                </Content>
                <Footer>
                    <FooterTab>
                        {MenuProvider.getNavMenuComponents().map(
                            (item, index) => <Button active
                                onPress={
                                    () => {
                                        this.props.history.push(item.menu.url);
                                    }
                                }
                            >
                                <Icon name={item.menu.icon} />
                            </Button>)}
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default withRouter(Layout)