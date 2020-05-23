import React from 'react';
import LogoImg from 'images/logo.png';

export default class IELogo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <h1 className="ie-logo m-0">
                <a href="/">
                    <img alt="logo" src={LogoImg} />
                    Ant Design
                </a>
            </h1>
        );
    }
}