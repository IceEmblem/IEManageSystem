import React from 'react'
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import './Index.css'

import PageContainer from './PageContainer/PageContainer.jsx'
import ComponentTool from './ComponentTool/ComponentTool.jsx'

export default class PageEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            selectedComponentDescribe: undefined
        }
    }

    render() {
        return (<div className="pagecomponent">
            <Animate
                start={() => ({
                    toolcontainHeight: 35,
                    btnRadius: 0,
                    btnFontSize: 1,
                    width: 12,
                    borderBottom: 0.5
                })}

                update={[{
                    toolcontainHeight: [this.state.open ? 35 : 0],
                    btnRadius: [this.state.open ? 0 : 1],
                    btnFontSize: [this.state.open ? 1 : 0.3],
                    borderBottom: [this.state.open ? 0.5 : 0],
                    timing: { delay: this.state.open ? 500: 0, duration: 500, ease: easeExpOut },
                },
                {
                    width: [this.state.open ? 12 : 3],
                    timing: { delay: this.state.open ? 0: 500, duration: 500, ease: easeExpOut },
                }]}
            >
                {(state) => {
                    const { width, toolcontainHeight, btnRadius, btnFontSize, borderBottom } = state

                    return (
                        <div className="pagecomponent-left shadow"
                            style={{
                                width:`${width}%`,
                                borderRadius: `${btnRadius}rem`,
                                borderBottomWidth: `${borderBottom}rem`
                            }}
                        >
                            <button className="btn btn-info btn-block pagecomponent-left-btn"
                                style={{
                                    fontSize: `${btnFontSize}rem`
                                }}
                                onClick={() => {
                                    this.setState({ open: !this.state.open });
                                }}
                            >
                                <span className="oi oi-arrow-thick-left float-left" title="icon name" aria-hidden="true"></span>
                                <span className="oi oi-arrow-thick-right float-right" title="icon name" aria-hidden="true"></span>
                            </button>
                            <div className="pagecomponent-left-toolcontain"
                                style={{
                                    height: `${toolcontainHeight}rem`
                                }}
                            >
                                <ComponentTool 
                                    selectedComponentDescribe={this.state.selectedComponentDescribe}
                                    selectComponentDescribe={(selectedComponentDescribe)=>{this.setState({selectedComponentDescribe: selectedComponentDescribe})}}
                                />
                            </div>
                        </div>
                    )
                }}
            </Animate>
            <div className="pagecomponent-right">
                <PageContainer
                    selectedComponentDescribe={this.state.selectedComponentDescribe}
                    pageName={this.props.match.params.pageName} 
                />
            </div>
        </div>);
    }
}