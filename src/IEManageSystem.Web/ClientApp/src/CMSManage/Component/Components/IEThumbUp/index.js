import React from 'react'
import {BaseField} from '../BaseComponent';
import BaseComponentObject, { ComponentDataConfig } from '../BaseContentLeafComponent'
import IEThumbUp from './IEThumbUp'
import ComponentDescribe, {componentType} from '../ComponentDescribe';

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfig = (props) => (
            <ComponentDataConfig {...props} />);
    }
    Component(props) {
        return <IEThumbUp {...props} />
    }
    Preview() {
        return <p>{"自己领悟 "}<span className="oi oi-thumb-up"></span></p>;
    }
}

let componentDescribe = new ComponentDescribe("IEThumbUp", new ComponentObject(), componentType.other);

componentDescribe.logicCode = `
public void Exec(ContentComponentData componentData, PageComponentBase pageComponent, PageData pageData, string request){
    // field1 是点赞
    int field1 = 0;

    // field2 是反点赞
    int field2 = 0;

    try
    {
        field1 = Convert.ToInt32(componentData.Field1);
        field2 = Convert.ToInt32(componentData.Field2);
    }
    catch (Exception) 
    { 
    }

    if(request == "1"){
        field1++;
        componentData.Field1 = field1.ToString();
    }
    else{
        field2++;
        componentData.Field2 = field2.ToString();
    }
}
`;

export default componentDescribe;