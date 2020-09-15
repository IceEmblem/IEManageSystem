import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import IComponent from 'IETemplateComponents/IECategoryLabel/IComponent'

class Component extends IComponent {

    createItem(singleData) {
        return (
            <Link to={this.createUrl(singleData.tagName)} className={`ant-btn mr-1 ml-1 ant-btn-dashed mb-1`}
                style={this.getCurStyle(singleData.tagName)}
            >
                {singleData.displayName}
            </Link>
        );
    }

    defaultComponent() {
        let datas = this.getTagDatas();

        return (
            <div className="d-flex flex-wrap">
                {datas.map(item => this.createItem(item))}
            </div>
        );
    }

    interactiveComponent() {
        let datas = this.getTagDatas();

        return (
            <div className="d-flex flex-wrap">
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
            </div>
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

export default withRouter(Component);
