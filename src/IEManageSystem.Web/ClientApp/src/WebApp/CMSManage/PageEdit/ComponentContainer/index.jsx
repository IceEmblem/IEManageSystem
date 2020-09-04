import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

import ComponentContainerBox from 'BaseCMSManage/ComponentContainerBoxs'
import Page from 'CMSManage/Home/Page'
import { PageComponentOSType } from 'BaseCMSManage/Models/Pages/PageComponentModel'
import { IComponentContainerBoxShow } from 'BaseCMSManage/ComponentContainerBoxs'
import IocContainer from 'Core/IocContainer'

import EditComponentContainerBoxShow from './EditComponentContainerBoxShow'
import SignSquareFrame from './SignSquareFrame'
import CurrentToolBtns from './CurrentToolBtns'

class PageEditCompontContainer extends React.Component {
    lastSelectedPageComponentSign = null;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        IocContainer.registerSingleIntances(IComponentContainerBoxShow, EditComponentContainerBoxShow)
    }

    render() {
        let style = {};
        if (this.props.rootPageComponent.os == PageComponentOSType.Native) {
            style.width = "400px"
            style.margin = "auto"
        }
        return (
            <div
                className="w-100 h-100"
                style={{ overflowY: "auto" }}
            >
                <div className="w-100 h-100">
                    <Page style={style}>
                        {
                            this.props.rootPageComponent.pageComponentSigns.map(sign => (
                                <>
                                    <ComponentContainerBox
                                        key={sign + this.props.rootPageComponent.os}
                                        sign={sign}
                                        pageId={this.props.pageId}
                                        pageDataId={this.props.pageDataId}
                                        os={this.props.rootPageComponent.os}
                                    >
                                    </ComponentContainerBox>
                                </>
                            ))
                        }
                        <SignSquareFrame
                            color="#13c2c2"
                            os={this.props.rootPageComponent.os}
                        />
                    </Page>
                </div>
                <CurrentToolBtns
                    pageId={this.props.pageId}
                    pageDataId={this.props.pageDataId}
                    os={this.props.rootPageComponent.os}
                />
            </div>
        );
    }
}

PageEditCompontContainer.propTypes = {
    // 如下3个属性为父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    rootPageComponent: PropTypes.object.isRequired,
}

export default PageEditCompontContainer;