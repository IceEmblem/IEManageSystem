import React from 'react'
import { Link, withRouter } from 'react-router-native'
import { StyleSheet, View, Text } from 'react-native'
import IComponent from 'IETemplateComponents/IECategoryLabel/IComponent'

import { Button, Item } from 'native-base'

class Component extends IComponent {
    createItem(singleData) {
        return (
            <Button
                small
                style={styles.button}
                info={this.curSelectTagName == singleData.tagName}
                transparent={this.curSelectTagName != singleData.tagName}
                onPress={()=>{
                    this.props.history.push(this.createUrl(singleData.tagName));
                }}
            >
                <Text style={{color: this.curSelectTagName == singleData.tagName ? '#fff' : '#000A'}}>{singleData.displayName}</Text>
            </Button>
        );
    }

    defaultComponent(){
        let datas = this.getTagDatas();

        return (
            <View style={[this.baseStyle, styles.view]}>
                {datas.map(item => this.createItem(item))}
            </View>
        );
    }

    interactiveComponent() {
        let datas = this.getTagDatas();

        return (
            <View style={[this.baseStyle, styles.view]}>
                {datas.map(item => {
                    let Component;
                    if (item.tagName == this.curSelectTagName) {
                        Component = this.props.ChildComponent['selected'];
                    }
                    else{
                        Component = this.props.ChildComponent['unselect'];
                    }

                    if (Component) {
                        return <Component
                            interactivConfigFeature={this.getInteractivConfigFeature(item)}
                        />
                    }
                    else{
                        return this.createItem(item);
                    }
                })}
            </View>
        );
    }

    render() {
        if (!this.props.isExitChild) {
            return this.defaultComponent();
        }
        else {
            return this.interactiveComponent();
        }
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
        padding: 10,
    },
})

export default withRouter(Component);
