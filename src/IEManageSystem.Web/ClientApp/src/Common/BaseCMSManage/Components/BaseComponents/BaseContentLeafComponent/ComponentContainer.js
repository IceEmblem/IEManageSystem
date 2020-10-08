import React from 'react'
import ComponentDataModel from 'BaseCMSManage/Models/ComponentDataModel'

export default (Component) => (props) => {
    let defaultComponentData = props.currentPageAndPost.defaultComponentDatas[props.sign];
    let contentComponentData = props.currentPageAndPost.contentComponentDatas[props.sign];
    let componentData = contentComponentData || defaultComponentData || ComponentDataModel.CreateDefaultComponentData(props.sign);

    return <Component 
        {...props}
        componentData={componentData}
    />
}