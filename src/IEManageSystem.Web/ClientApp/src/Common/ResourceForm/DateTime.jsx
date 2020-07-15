import React from 'react'
import { DatePicker } from 'antd'

import moment from 'moment';

export default class DateTime extends React.Component{
    render(){
        return (
            <div>
                <h5 class="font-weight-bold">{this.props.title}</h5>
                <DatePicker disabled={!this.props.isEdit} value={moment(this.props.value)} onChange={(value=>{this.props.onChange(value)})} />
            </div>
        )
    }
}