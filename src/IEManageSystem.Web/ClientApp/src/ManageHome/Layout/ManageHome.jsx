import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav.jsx';
import SideNav from "./SideNav/SideNav.jsx";
import BodyDiv from './BodyDiv/BodyDiv.jsx';
import NavTag from './NavTag/NavTag.jsx';

import 'Layout/Module'

require('./ManageHome.css');

import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import Loading from './Parts/Loading.jsx'
import Error from './Parts/Error.jsx'

export default class ManageHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
    }

    render() {
        return (
            <div className="container-fluid h-100">
                <div className="manage-home d-flex flex-column h-100">
                    <Nav 
                        sideNavState={this.state.open}
                        setSideNavState={(open)=>{
                            this.setState({
                                open: open
                            })
                        }}
                    />
                    <div className="d-flex flex-grow-1 overflow-hidden-y w-100">
                        <div className="d-flex w-100">
                            <Animate
                                start={() => ({
                                    x: 16,
                                })}

                                update={() => ({
                                    x: [this.state.open ? 16 : 0],
                                    timing: { duration: 750, ease: easeExpOut },
                                })}
                            >
                                {(state) => {
                                    const { x } = state

                                    return (
                                        <div className="h-100 padding-0 d-flex sidenavdiv flex-shrink-0" style={{
                                            width: `${x}%`
                                        }}>
                                            <SideNav />
                                        </div>
                                    )
                                }}
                            </Animate>
                            <div className="h-100 padding-0 right-content">
                                <div className="flex-shrink-0">
                                    <NavTag />
                                </div>
                                <div className="bodydiv-parent d-flex flex-grow-1 w-100">
                                    <Route path="/ManageHome/:menuId?/:menuItemId?" component={BodyDiv} />
                                </div>
                                <div className="flex-shrink-0 nav-bottom">
                                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                                        <small className="text-white">
                                            Copyright © 2019 by IceEmblem. All rights reserved.
                                        </small>
                                        <span className="text-white ml-auto">
                                            由冰纹工作室开发开发
                                        </span>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Loading />
                    <Error />
                </div>
            </div>
        );
    }
}