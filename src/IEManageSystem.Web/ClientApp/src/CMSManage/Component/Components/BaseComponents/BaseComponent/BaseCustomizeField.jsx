import React from 'react';
import PropTypes from 'prop-types';

export default class BaseCustomizeField extends React.Component{
    constructor(props){
        super(props);

        this.fieldValue = this.getFieldValue();
    }

    // 在组件初始化时调用
    getFieldValue() {
        if(!this.props.fieldValue){
            return {};
        }

        let fieldValue;
        try{
            fieldValue = JSON.parse(this.props.fieldValue);
        }
        catch(e){
            return {};
        }

        return fieldValue;
    }

    // 设置字段的值
    // 推荐在失去焦点时调用该函数
    setFieldValue() {
        if(!this.fieldValue){
            return;
        }
        
        this.props.setFieldValue(JSON.stringify(this.fieldValue));
    }
}

BaseCustomizeField.propTypes = {
    fieldValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired,
    text: PropTypes.string,
}