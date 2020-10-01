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
                        this.props.sign,
                        this.props.currentPageAndPost,
                    )
                }
            </div>
        )
    }
}

ToolBtns.propTypes = {
    // 如下个属性由父组件传入
    sign: PropTypes.string.isRequired,

    pageComponent: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let pageName = ownProps.currentPageAndPost.pageName;
    let os = ownProps.currentPageAndPost.os;

    return {
        pageComponent: state.pageComponents[pageName][os][ownProps.sign],
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