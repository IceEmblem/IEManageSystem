import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

export class SignSquareFrame extends React.Component {
    getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) 
        {
            if(this.props.rootElementId && current.id == this.props.rootElementId){
                break;
            }

            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    }

    getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) 
        {
            if(this.props.rootElementId && current.id == this.props.rootElementId){
                break;
            }

            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    }

    render() {
        let targetElement = document.getElementById(`__component__${this.props.currentPageAndPost.os}__${this.props.activePageComponentSign}`);
        if (!targetElement) {
            return <div></div>
        }

        let style = {
            position: "absolute",
            border: `1px solid ${this.props.color}`,
        }

        let left = this.getElementLeft(targetElement);
        let top = this.getElementTop(targetElement);
        let width = targetElement.clientWidth - 2;
        let height = targetElement.clientHeight - 2;

        return <div>
            <span style={{ ...{ left: left, top: top, width: width }, ...style }}></span>
            <span style={{ ...{ left: left + width, top: top, height: height }, ...style }}></span>
            <span style={{ ...{ left: left, top: top + height, width: width }, ...style }}></span>
            <span style={{ ...{ left: left, top: top, height: height }, ...style }}></span>
        </div>
    }
}

SignSquareFrame.propTypes = {
    // 如下属性由父组件传入
    currentPageAndPost: PropTypes.object.isRequired,
    rootElementId: PropTypes.object,

    activePageComponentSign: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => {
    return {
        activePageComponentSign: ownProps.activePageComponentSign || state.activePageComponentSign
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default CmsRedux.connect(
    mapStateToProps, 
    mapDispatchToProps)(SignSquareFrame);