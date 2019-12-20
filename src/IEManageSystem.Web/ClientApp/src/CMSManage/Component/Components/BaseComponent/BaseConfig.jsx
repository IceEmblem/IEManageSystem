import React from 'react';
import PropTypes from 'prop-types';

export default class BaseConfig extends React.Component {
}

BaseConfig.propType = {
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}