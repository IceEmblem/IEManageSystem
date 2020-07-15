import React from 'react';

import IELinePlotDemo from './IELinePlotDemo'
import IEGroupedColumnDemo from './IEGroupedColumnDemo'

import CarouselDemo from './CarouselDemo'
import IECommentDemo from './IECommentDemo'
import IEProgressDemo from './IEProgressDemo'

import { Skeleton } from 'antd';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-area">
                <div>
                    <div className="row bg-white mb-3">
                        <h6 className="col-md-12 mt-3 mb-3">大量图表，业务分析不是问题</h6>
                        <div className="col-md-6">
                            <IELinePlotDemo />
                        </div>
                        <div className="col-md-6">
                            <IEGroupedColumnDemo />
                        </div>
                    </div>
                    <div className="row bg-white pb-3">
                        <h6 className="col-md-12 mt-3 mb-3">多样化的组件，随意组合</h6>
                        <div className="col-md-4">
                            <CarouselDemo />
                        </div>
                        <div className="col-md-8">
                            <IECommentDemo />
                        </div>
                    </div>
                    <div className="row bg-white pb-3">
                        <div className="col-md-8">
                            <Skeleton avatar paragraph={{ rows: 4 }} />
                        </div>
                        <div className="col-md-4">
                            <IEProgressDemo />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}