import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Data from 'IETemplateComponents/IECard/Data'
import {withRouter} from 'react-router-dom'
import { Card } from 'antd';
const { Meta } = Card;

class Component extends IComponent {
    render() {
        let data = new Data(this.props.componentData);

        return (
            <a href='javascript:void(0)' onClick={()=>{
                if(!data.link){
                    return;
                }

                if(data.link.startsWith('http')){
                    document.location.href = data.link;
                }

                this.props.history.push(data.link);
            }}>
                <Card
                    hoverable
                    title={
                        this.props.children['top']
                    }
                    cover={
                        this.props.children['middle']
                    }
                >
                    {
                        this.props.children['bottom']
                    }
                </Card>
            </a>);
    }
}

export default withRouter(Component);
