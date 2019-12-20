import React from 'react';
import PropTypes from 'prop-types';
import BaseConfig from './BaseConfig';

export default class DefaultSettingConfig extends BaseConfig {
    render() {
        return (<div>
            {this.props.field1 &&
                <this.props.field1 fieldValue={this.props.data.field1} setFieldValue={(value) => { this.props.setData({ ...this.props.data, ...{ field1: value } }) }} />}
            {this.props.field2 &&
                <this.props.field2 fieldValue={this.props.data.field2} setFieldValue={(value) => { this.props.setData({ ...this.props.data, ...{ field2: value } }) }} />}
            {this.props.field3 &&
                <this.props.field3 fieldValue={this.props.data.field3} setFieldValue={(value) => { this.props.setData({ ...this.props.data, ...{ field3: value } }) }} />}
            {this.props.field4 &&
                <this.props.field4 fieldValue={this.props.data.field4} setFieldValue={(value) => { this.props.setData({ ...this.props.data, ...{ field4: value } }) }} />}
            {this.props.field5 &&
                <this.props.field5 fieldValue={this.props.data.field5} setFieldValue={(value) => { this.props.setData({ ...this.props.data, ...{ field5: value } }) }} />}
        </div>);
    }
}

DefaultSettingConfig.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
    // 组件 props={fieldValue, setFieldValue}
    field1: PropTypes.func,
    field2: PropTypes.func,
    field3: PropTypes.func,
    field4: PropTypes.func,
    field5: PropTypes.func,
}