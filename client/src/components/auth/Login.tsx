import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Login.css'
import { loginUser } from '../../actions/authActions'
import { AuthState, UserData } from '../../types/authTypes'
import { History } from 'history'
import { AppState } from '../../store'
import { ErrorState } from '../../types/errorTypes'

interface LoginProps {
  auth: AuthState
  history: History
  errors: ErrorState
  loginUser: (userData: UserData) => void
}

const Login: React.FC<LoginProps> = ({ auth, history, errors, loginUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    loginUser({ email, password })
  }

  return (
    <>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={onSubmit} noValidate>
        <input
          type='email'
          name='email'
          placeholder='Your Email'
          onChange={e => setEmail(e.target.value)}
          className={errors.email ? 'is-invalid' : ''}
        />
        {errors.email && (
          <span className='invalid-feedback'>{errors.email}</span>
        )}
        <input
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='on'
          onChange={e => setPassword(e.target.value)}
          className={errors.password ? 'is-invalid' : ''}
        />
        {errors.password && (
          <span className='invalid-feedback'>{errors.password}</span>
        )}
        <input type='submit' value='Login' />
      </form>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { loginUser },
)(Login)
