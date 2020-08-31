import React from 'react';
import PropTypes from 'prop-types'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import './ToolBtns.css'

class ToolBtns extends React.Component {
    state = {
        show: false,
    }

    constructor(props) {
        super(props);
        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
    }

    render() {
        if(!this.componentDescribe.componentObject.ComponentDataConfig){
            return <div></div>;
        }

        return (
            <div className="parentcomponent-btns"
                key={"editFrameBtn"}
            >
                {
                    this.componentDescribe.componentObject.ComponentDataConfig.bulidConfigBtnComponent(
                        this.props.pageId,
                        this.props.pageDataId,
                        this.props.pageComponent.os,
                        this.props.sign,
                    )
                }
            </div>
        )
    }
}

ToolBtns.propTypes = {
    // 如下 3 个属性由父组件传入
    os: PropTypes.string.isRequired,
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number.isRequired,
    sign: PropTypes.string.isRequired,
    pageComponent: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ToolBtns)

export default Contain;