import React from 'react';
import PropTypes from 'prop-types'
import { sideMenuSelect } from 'Layout/IEReduxs/Actions';
import { NavLink, withRouter } from 'react-router-dom';

import LayoutRedux from 'Layout/IEReduxs/LayoutRedux';

import './NavTag.css'

class NavTag extends React.Component {
    constructor(props) {
        super(props);

        this.menuItems = new Array();

        this._leftClick = this._leftClick.bind(this);
        this._rightClick = this._rightClick.bind(this);

        this.left = 0;
    }

    componentWillMount() {
        this.updateTag(this.props);
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateTag(nextProps);
    }

    updateTag(props) {
        if (props.selectedSideMenu == null) {
            return;
        }

        for (let item in this.menuItems) {
            if (this.menuItems[item].id == props.selectedSideMenu.id) {
                return;
            }
        }

        this.menuItems.push(props.selectedSideMenu);
    }

    _rightClick(event) {
        var parentWidth = $("#navTagTab").width();
        var width = $("#navTagTab").children("div").width();

        this.left = this.left - 200;

        if (parentWidth > width + this.left) {
            this.left = -(width - parentWidth);
        }

        $("#navTagTab").children("div").css("left", this.left + "px");
    }

    _leftClick(event) {
        this.left = this.left + 200;
        if (this.left > 0) {
            this.left = 0
        }

        $("#navTagTab").children("div").css("left", this.left + "px");
    }

    render() {
        let lis = new Array();
        lis.push(<li key={0} className="nav-item">
            <NavLink className="btn-bubble" to="/ManageHome/Index" activeClassName="btn-bubble-active">
                <span><span className="oi oi-home mr-2" title="icon name" aria-hidden="true"></span></span>
                <span>{"后台首页"}</span>
            </NavLink>
        </li>);

        var curUrl = this.props.location.pathname;

        this.menuItems.map((item, index) => {
            lis.push(<li key={index + 1} className="nav-item">
                <a className={"btn-bubble " + (curUrl == item.url ? "btn-bubble-active" : "")} href="javascript:void(0)"
                    onClick={
                        () => {
                            this.props.history.push(item.url);
                            this.props.sideMenuSelect(item);
                        }
                    }
                >
                    <span>
                        <span className={
                            "oi mr-2 " +
                            (item.icon == undefined ? "" : item.icon)
                        } title="icon name" aria-hidden="true">
                        </span>
                    </span>
                    <span>{item.text}</span>
                    <span className="float-right">
                        <span className="oi oi-delete nav-tag-deleteicon" title="icon name" aria-hidden="true"
                            onClick={
                                (event) => {
                                    event.stopPropagation();//阻止事件冒泡即可

                                    this.menuItems.splice(index, 1);

                                    // 如果当前标签没有被选中
                                    if (!$(event.currentTarget).parents("a").eq(0).hasClass("btn-bubble-active")) {
                                        this.setState({});
                                        return false;
                                    }

                                    if (index == 0) {
                                        this.props.history.push("/ManageHome/Index");
                                        this.props.sideMenuSelect(null);
                                    }

                                    this.props.history.push(this.menuItems[index - 1].url);
                                    this.props.sideMenuSelect(this.menuItems[index - 1]);
                                }
                            }
                        ></span>
                    </span>

                </a>
            </li>);
        });

        return (
            <div className="w-100 nav-tag d-flex padding-right-10">
                <button className="btn btn-outline-secondary border-0"
                    onClick={this._leftClick}>
                    <span className="oi oi-arrow-thick-left" title="icon name" aria-hidden="true"></span>
                </button>
                <div id="navTagTab" className="tag flex-grow-1 flex-shrink-1">
                    <div>
                        <ul className="nav">
                            {lis}
                        </ul>
                    </div>
                </div>
                <button className="btn btn-outline-secondary border-0"
                    onClick={this._rightClick}>
                    <span className="oi oi-arrow-thick-right" title="icon name" aria-hidden="true"></span>
                </button>
                <button className="btn nav-tag-closeall"
                    onClick={
                        () => {
                            this.menuItems = [];
                            this.props.sideMenuSelect(null);
                            $("#navTagTab").children("div").css("left", 0 + "px");
                            this.props.history.push("/ManageHome/Index");
                        }
                    }
                >
                    <span className="padding-right-10">关闭所有</span>
                    <span className="oi oi-circle-x" title="icon name" aria-hidden="true"></span>
                </button>
            </div>
        );
    }
}

NavTag.propTypes = {
    selectedSideMenu: PropTypes.object,
    sideMenuSelect: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectedSideMenu: state.selectedSideMenu
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sideMenuSelect: (menu) => dispatch(sideMenuSelect(menu))
    }
}

const NavTagContain = LayoutRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps, // 关于dispatch
    undefined,
    { pure: false }
)(withRouter(NavTag))

export default NavTagContain;