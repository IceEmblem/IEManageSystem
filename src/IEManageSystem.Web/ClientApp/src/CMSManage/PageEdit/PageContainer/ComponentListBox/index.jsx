import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

import ComponentFrame from './ComponentFrame.jsx'
import ComponentFactory, { componentTypes } from 'CMSManage/Component/Components/ComponentFactory'

import { Modal, Card, Input, Typography  } from 'antd';

const { Search } = Input;

class ComponentListBox extends React.Component {
    componentDescribes = new ComponentFactory().getComponentDescribes();

    constructor(props) {
        super(props);

        this.state = {
            selectedComponentDescribe: undefined,
            activeIndex: 0,
            searchText: null
        }
    }

    createComponent(item) {
        return (
            <ComponentFrame
                key={item.name}
                active={this.state.selectedComponentDescribe && this.state.selectedComponentDescribe.name == item.name}
                componentOnClick={
                    () => {
                        // 如果点中的不是之前选择的项目
                        if (this.state.selectedComponentDescribe != item) {
                            this.setState({ selectedComponentDescribe: item });
                            return;
                        }

                        this.props.close();
                        this.props.addComponent(item);
                    }
                }
            >
                {item.componentObject.Preview()}
            </ComponentFrame>);
    }

    render() {
        let componentDescribes;
        if(this.state.searchText){
            debugger
            componentDescribes = this.componentDescribes.filter(item=>item.displayName.indexOf(this.state.searchText) >= 0);
        }
        else{
            componentDescribes = this.componentDescribes;
        }
        
        let list = componentTypes.map((componentType, index) => {
            let childComponentDescribes = componentDescribes.filter(e => e.componentType == componentType.name)
            let childComponents = childComponentDescribes.map(item => this.createComponent(item))
            componentDescribes = componentDescribes.filter(e => e.componentType != componentType.name)

            if(childComponents.length == 0){
                return undefined;
            }

            return (
                <Card key={index} title={componentType.text} size="small">
                    {childComponents}
                </Card>);
        });

        return (
            <Modal
                title={
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="">请选择组件</span>
                        <div style={{marginRight: "30px"}}>
                            <Search placeholder="搜索组件" onSearch={value => this.setState({searchText: value})} enterButton />
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