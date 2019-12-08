import React from 'react'
import PropTypes from 'prop-types'
import {BaseLeafComponent} from '../BaseLeafComponent'

import './Progress.css'

const defaultData = [
    {
        title: "打开某宝或某信",
        content: "打开你的某宝或某信，如果没有，就去下载",
        btnTitle: "第1步"
    },
    {
        title: "打开钱包",
        content: "打开钱包，并向楼主询问某宝或某信号码",
        btnTitle: "第2步"
    },
    {
        title: "输入金额",
        content: "输入你喜欢的金额，一定要选择吉利的数字，比如6666，8888等",
        btnTitle: "第3步"
    },
    {
        title: "输入密码",
        content: "输入你的密码，什么，忘记密码怎么办？那就跳过吧..............（穷*）",
        btnTitle: "第4步"
    },
    {
        title: "开始建站",
        content: "恭喜你，走到这一步，你已经完整了百分之0，现在，你只需要找到一个程序员，并告诉他本项目的github地址，他会帮你完成这一切，是不是很简单",
        btnTitle: "第5步"
    }];

class Progress extends BaseLeafComponent {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }
    }

    createData(field)
    {
        if(!field){
            return null;
        }

        let value;
        try{
            value = JSON.parse(field);
        }
        catch{
            value = null
        }

        return value
    }

    getData() {
        if (!this.props.componentData) {
            return defaultData;
        }

        let data  = [];
        let field1 = this.createData(this.props.componentData.field1)
        if(field1 != null)
        {
            data.push(field1)
        }

        
        let field2 = this.createData(this.props.componentData.field2)
        if(field2 != null)
        {
            data.push(field2)
        }

        let field3 = this.createData(this.props.componentData.field3)
        if(field3 != null)
        {
            data.push(field3)
        }

        let field4 = this.createData(this.props.componentData.field4)
        if(field4 != null)
        {
            data.push(field4)
        }

        let field5 = this.createData(this.props.componentData.field5)
        if(field5 != null)
        {
            data.push(field5)
        }

        if(data.length == 0){
            data = defaultData
        }

        return data;
    }

    render() {

        let data = this.getData();

        let currentIndex = data.length - 1 < this.state.index ? data.length - 1 : this.state.index

        let barUnitWidth = 100 / data.length;
        let barWidth = (data.length - 1) * barUnitWidth;
        let left = barUnitWidth / 2;

        let steps = [];
        data.forEach((item, index) => {
            steps.push(
                <div className='ie-progress_inner__step'
                    key={index}
                    onClick={() => { this.setState({ index: index }) }}
                    style={{ width: `${barUnitWidth}%` }}
                >
                    <span className="ie-progress_inner__step-before shadow">{index + 1}</span>
                    <label className="shadow">{item.btnTitle}</label>
                </div>)
        });

        let card = <div className={`card ie-progress-card mt-2 bg-light w-75 mx-auto shadow ie-progress-card-show`}>
            <div className="card-body">
                <h5 className="card-title">{data[currentIndex].title}</h5>
                <p className="card-text">{data[currentIndex].content}</p>
            </div>
        </div>

        return (
            <div className='ie-progress'>
                <div className='ie-progress_inner'>
                    <div className='ie-progress_inner__bar' style={{ width: `${currentIndex * barUnitWidth}%`, left: `${left}%` }}></div>
                    <div className='ie-progress_inner__bar--set' style={{ width: `${barWidth}%`, left: `${left}%` }}></div>
                    {steps}
                    <div className="w-100">
                        {card}
                    </div>
                </div>
            </div>
        );
    }
}

export default Progress;