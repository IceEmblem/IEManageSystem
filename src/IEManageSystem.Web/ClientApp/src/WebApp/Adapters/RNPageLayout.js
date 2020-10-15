import React from 'react'
import Theme from 'RNCommon/Theme'
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Item, StyleProvider, Text, Input } from 'native-base'
import { MenuOutlined, HomeOutlined, UserOutlined, SearchOutlined, ScanOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ScrollView, View } from 'react-native'

export default (props) => {
    return <StyleProvider style={Theme.getTheme()}>
        <div id={props.rootId} style={{ position: 'relative', height: '100%' }}>
            {
                props.children
            }
            {
                props.tools
            }
        </div>
    </StyleProvider>
}