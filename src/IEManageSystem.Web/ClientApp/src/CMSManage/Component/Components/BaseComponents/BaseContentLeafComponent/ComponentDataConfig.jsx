import React from 'react';
import PropTypes from 'prop-types';
import BaseConfig from '../BaseComponent/BaseConfig';

// 该配置只处理默认数据
export default class ComponentDataConfig extends BaseConfig {
    render() {
        let defaultData = this.props.data.getDefauleData();

        return (<div>
            {this.props.field1 &&
                <this.props.field1 fieldValue={defaultData.field1}
                    setFieldValue={(value) => {
                        defaultData.field1 = value;
                        this.props.setData(this.props.data)
                    }
                    } />
            }
            {this.props.field2 &&
                <this.props.field2 fieldValue={defaultData.field2}
                    setFieldValue={(value) => {
                        defaultData.field2 = value;
                        this.props.setData(this.props.data)
                    }
                    } />
            }
            {this.props.field3 &&
                <this.props.field3 fieldValue={defaultData.field3}
                    setFieldValue={(value) => {
                        defaultData.field3 = value;
                        this.props.setData(this.props.data)
                    }
                    } />
            }
            {this.props.field4 &&
                <this.props.field4 fieldValue={defaultData.field4}
                    setFieldValue={(value) => {
                        defaultData.field4 = value;
                        this.props.setData(this.props.data)
                    }
                    } />
            }
            {this.props.field5 &&
                <this.props.field5 fieldValue={defaultData.field5}
                    setFieldValue={(value) => {
                        defaultData.field5 = value;
                        this.props.setData(this.props.data)
                    }
                    } />
            }
        </div>);
    }
}

ComponentDataConfig.propTypes = {
    // data 为 ComponentDataModel
    data: PropTypes.object,
    // setData 为 (ComponentDataModel) => void;
    setData: PropTypes.func.isRequired,
    // 组件
    field1: PropTypes.func,
    field2: PropTypes.func,
    field3: PropTypes.func,
    field4: PropTypes.func,
    field5: PropTypes.func,
}