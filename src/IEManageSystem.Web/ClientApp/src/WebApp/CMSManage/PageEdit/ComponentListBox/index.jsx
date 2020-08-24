import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

import ComponentFrame from './ComponentFrame.jsx'
import ComponentFactory, { componentTypes } from 'BaseCMSManage/Components/ComponentFactory'

import { Modal, Card, Input, Typography } from 'antd';

const { Search } = Input;

class ComponentListBox extends React.Component {
    constructor(props) {
        super(props);

        this.componentDescribes = ComponentFactory.getComponentDescribes();
        this.Preview = new Map();
        this.componentDescribes.map(item=>{
            this.Preview[item.name] = <item.componentObject.Preview />;
        });

        this.state = {
            selectedComponentDescribe: undefined,
            activeIndex: 0,
            componentDescribes: this.componentDescribes
        }
    }

    componentFrameClick(item) {
        // 如果点中的不是之前选择的项目
        if (this.state.selectedComponentDescribe != item) {
            this.setState({ selectedComponentDescribe: item });
            return;
        }

        this.props.close();
        this.props.addComponent(item);
    }

    createComponent(item) {
        return (
            <ComponentFrame
                key={item.name}
                alterText={item.displayName}
                active={this.state.selectedComponentDescribe && this.state.selectedComponentDescribe.name == item.name}
                componentOnClick={() => this.componentFrameClick(item)}
            >
                {this.Preview[item.name]}
            </ComponentFrame>);
    }

    createComponentGroup(componentType) {
        let componentDescribes = this.state.componentDescribes;
        let childComponentDescribes = componentDescribes.filter(e => e.componentType == componentType.name)
        let childComponents = childComponentDescribes.map(item => this.createComponent(item))
        componentDescribes = componentDescribes.filter(e => e.componentType != componentType.name)

        if (childComponents.length == 0) {
            return undefined;
        }

        return (
            <Card key={componentType.name} title={componentType.text} size="small">
                {childComponents}
            </Card>);
    }

    render() {
        let list = componentTypes.map((componentType) => {
            return this.createComponentGroup(componentType);
        });

        return (
            <Modal
                title={
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="">请选择组件</span>
                        <div style={{ marginRight: "30px" }}>
                            <Search placeholder="搜索组件"
                                onSearch={value => {
                                    let componentDescribes;
                                    if (value) {
                                        componentDescribes = this.componentDescribes.filter(item => item.displayName.indexOf(value) >= 0);
                                    }
                                    else {
                                        componentDescribes = this.componentDescribes;
                                    }
                                    this.setState({componentDescribes: componentDescribes});
                                }}
                                enterButton />
                        </div>
                    </div>
                }
                visible={this.props.show}
                footer={null}
                width={1000}
                zIndex={9999}
                onCancel={() => this.props.close()}
            >
                <div className="pageedit-componentlistbox-body">
                    {list}
                </div>
            </Modal>);
    }
}

ComponentListBox.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    addComponent: PropTypes.func.isRequired
}

ComponentListBox.defaultProps = {
}

export default ComponentListBox;