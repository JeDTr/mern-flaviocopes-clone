import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import { AuthState } from '../../types/authTypes'

interface Props extends RouteProps {
  component: React.ComponentType<any>
  auth: AuthState
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  auth,
  ...rest
}) =>
  auth.isAuthenticated ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to='/login' />
  )

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
