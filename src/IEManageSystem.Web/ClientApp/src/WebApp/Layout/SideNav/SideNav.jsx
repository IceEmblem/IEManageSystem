import React from 'react';
import PropsTypes from 'prop-types';
import IESideNav from 'Common/IESideNav';
import { withRouter } from "react-router-dom";

import './SideNav.css'

import LayoutRedux from 'BaseLayout/IEReduxs/LayoutRedux';
import { createTopLevelMenusFetch } from 'BaseLayout/IEReduxs/Actions'

class SideNav extends React.Component {
    // props.selectTopMenu
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.createTopLevelMenusFetch();
    }

    render() {
        return (
            <IESideNav
                className={this.props.className}
                mainMenu={this.props.rootMenu}
                sideMenuSelect={(menuItem) => {
                    this.props.history.push(menuItem.url);
                }}
            />
        );
    }
}

SideNav.propTypes = {
    rootMenu: PropsTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let rootMenu = {
        id: "IERootMenu",
        menuItems: state.topLevelMenus
    }

    return {
        rootMenu: rootMenu,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createTopLevelMenusFetch: () => dispatch(createTopLevelMenusFetch())
    }
}

const SideNavContain = LayoutRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps, // 关于dispatch
)(SideNav)

export default withRouter(SideNavContain);