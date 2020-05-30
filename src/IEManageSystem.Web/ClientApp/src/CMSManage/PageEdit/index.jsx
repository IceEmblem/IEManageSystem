import React from 'react'

import './index.css'

import PageContainer from './PageContainer/PageContainer.jsx'

export default class PageEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
    }

    render() {
        return (<div className="pagecomponent">
            <div className="pagecomponent-right">
                <PageContainer
                    pageName={this.props.match.params.pageName}
                />
            </div>
        </div>);
    }
}