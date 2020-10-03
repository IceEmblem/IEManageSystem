import React from 'react'
import { View, StyleSheet } from 'react-native'
import IComponent from 'IETemplateComponents/IELayout/IComponent'
import Device from 'RNInfrastructure/Device'

import { Container, Header, Content, Footer, FooterTab, Body, Icon, Text } from 'native-base'

class Component extends IComponent {
    state = {
        activeIndex: 0,
    }

    render() {
        let tops = this.props.children["top"];
        let middles = this.props.children["middle"];
        let bottoms = this.props.children["bottom"];

        return <Container style={{ height: Device.height, width: Device.width }}>
            {
                tops.length > 0 &&
                <Header>
                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            tops
                        }
                    </Body>
                </Header>
            }
            <Content>
                {
                    middles
                }
            </Content>
            {
                bottoms.length > 0 &&
                <Footer>
                    <FooterTab>
                        {
                            bottoms
                        }
                    </FooterTab>
                </Footer>
            }
        </Container>
    }
}

const styles = StyleSheet.create({
});



export default Component;
