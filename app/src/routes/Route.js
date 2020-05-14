/* import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
    component: Component,
    isPrivate,
     ...rest
}) {

    
    var signed = this.state.signed;

    //Route is private & not user logged
    if (isPrivate && !signed) {
        return <Redirect to="/login" />
    }

    //Route is public && user logged
    if(!isPrivate && signed) {
        return <Redirect to="/" />
    }

    return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false
}; */