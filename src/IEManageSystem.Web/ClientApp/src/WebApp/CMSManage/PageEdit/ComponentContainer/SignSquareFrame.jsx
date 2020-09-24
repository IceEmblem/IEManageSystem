import React from 'react'
import PropTypes from 'prop-types'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

class SignSquareFrame extends React.Component {
    state = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    }

    getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            if (this.props.rootElementId && current.id == this.props.rootElementId) {
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

        while (current !== null) {
            if (this.props.rootElementId && current.id == this.props.rootElementId) {
                break;
            }

            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pageComponent) {
            setTimeout(() => {
                let targetElement = document.getElementById(nextProps.pageComponent.getPageComponentId());
                if (!targetElement) {
                    return;
                }

                let left = this.getElementLeft(targetElement);
                let top = this.getElementTop(targetElement);
                let width = targetElement.clientWidth - 2;
                let height = targetElement.clientHeight - 2;

                this.setState({
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                })
            }, 0);
        }
    }

    render() {
        let style = {
            position: "absolute",
            border: `1px solid ${this.props.color}`,
        }

        let left = this.state.left;
        let top = this.state.top;
        let width = this.state.width;
        let height = this.state.height;

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

    pageComponent: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
    let activePageComponentSign = ownProps.activePageComponentSign || state.activePageComponentSign;
    let pageComponent = state.pageComponents[ownProps.currentPageAndPost.pageId][ownProps.currentPageAndPost.os][activePageComponentSign];

    return {
        pageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default CmsRedux.connect(
    mapStateToProps,
    mapDispatchToProps)(SignSquareFrame);