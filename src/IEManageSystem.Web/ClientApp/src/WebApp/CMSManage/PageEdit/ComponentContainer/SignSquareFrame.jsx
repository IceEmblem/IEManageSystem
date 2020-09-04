import React from 'react'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

export class SignSquareFrame extends React.Component {
    getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    }

    getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    }

    render() {
        let targetElement = document.getElementById(`__component__${this.props.os}__${this.props.activePageComponentSign}`);
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

const mapStateToProps = (state, ownProps) => {
    return {
        os: ownProps.os,
        activePageComponentSign: state.activePageComponentSign
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default CmsRedux.connect(
    mapStateToProps, 
    mapDispatchToProps)(SignSquareFrame);