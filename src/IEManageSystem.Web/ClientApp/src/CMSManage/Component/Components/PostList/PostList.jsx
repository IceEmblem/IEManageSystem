import React from 'react'
import { BasePageLeafComponent } from '../BasePageLeafComponent'
import { NavLink } from 'react-router-dom'

import './index.css';

export default class PostList extends BasePageLeafComponent {
    constructor(props) {
        super(props)
    }

    render() {
        let list = this.getPageDatasOrDemoDatas().map((item, index) => (
            <li key={item.id}>
                <span><span>{index + 1}</span></span>
                <NavLink className="text-secondary" to={`/Page/${this.state.page.name}/${item.name}`}>{item.title}</NavLink>
            </li>
        ));

        return (
            <div className="postlist">
                <ol className="postlist-rounded-list">
                    {list}
                </ol>
            </div>
        );
    }
}