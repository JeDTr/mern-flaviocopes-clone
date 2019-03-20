import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    auth.isAuthenticated ? (
        <Route {...rest} component={Component} />
    ) : (
        <Redirect to='/login' />
    )
  )

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)