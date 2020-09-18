import React from 'react'
import Theme from 'RNLayout/Theme'
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Item, StyleProvider, Text, Input } from 'native-base'
import { MenuOutlined, HomeOutlined, UserOutlined, SearchOutlined, ScanOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ScrollView, View } from 'react-native'

export default (props) => {
    return <StyleProvider style={Theme.getTheme()}>
        <Container style={{ height: '100%' }}>
            <Header>
                <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button transparent>
                        <Text><MenuOutlined style={{ color: '#fff' }} /></Text>
                    </Button>
                    <View style={{ height: 30, borderRadius: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between' }}>
                        <Button transparent>
                            <Text><SearchOutlined style={{ color: '#0008' }} /></Text>
                        </Button>
                        <Button transparent>
                            <Text style={{ marginRight: 20, paddingLeft: 0, paddingRight: 0 }}><ScanOutlined style={{ color: '#0008' }} /></Text>
                        </Button>
                    </View>
                    <Button transparent>
                        <Text style={{ paddingLeft: 16, paddingRight: 0 }}><MessageOutlined style={{ color: '#fff' }} /></Text>
                    </Button>
                    <Button transparent>
                        <Text style={{ paddingLeft: 16, paddingRight: 16 }}><EllipsisOutlined style={{ color: '#fff' }} /></Text>
                    </Button>

                </Body>
            </Header>
            <div style={{ flexGrow: 1, flexShrink: 1, height: 1, overflow: 'hidden' }}>
                <div id={props.rootId} style={{ position: 'relative', height: '100%', overflowY: 'scroll', width: 380 }}>
                    <div style={{overflowY: 'hidden'}}>
                        {
                            props.children
                        }
                        {
                            props.tools
                        }
                    </div>
                </div>
            </div>
            <Footer>
                <FooterTab>
                    <Button><Text><HomeOutlined style={{ color: '#fff' }} /></Text></Button>
                    <Button><Text><MenuOutlined style={{ color: '#fff' }} /></Text></Button>
                    <Button><Text><UserOutlined style={{ color: '#fff' }} /></Text></Button>
                </FooterTab>
            </Footer>
        </Container>
    </StyleProvider>
}