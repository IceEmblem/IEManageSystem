import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
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

        return <Container style={[this.baseStyle, styles.container]}>
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
            <View style={{ flexBasis: '0%', flexGrow: 1 }}>
                {
                    middles
                }
            </View>
            {
                bottoms.length > 0 &&
                <Footer style={{width: '100%'}}>
                    <FooterTab style={{width: '100%', flexWrap: 'nowrap', flexDirection: 'row'}}>
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
    container: {
        height: '100%', 
        width: '100%'
    }
});



export default Component;
