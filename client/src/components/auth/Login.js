import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { loginUser } from '../../actions/authActions';

function Login({auth, history, errors, loginUser}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
	})

	// componentWillReceiveProps(nextProps) {
	// 	if (nextauth.isAuthenticated) {
	// 		this.history.push('/dashboard');
	// 	}
	// }

	const onSubmit = (e) => {
		e.preventDefault();
		
		loginUser({email, password});
	}

	return (
		<Fragment>
			<h1 className="text-center">Login</h1>
			<form onSubmit={onSubmit} noValidate>
				<input 
					type="email" 
					name="email" 
					placeholder="Your Email" 
					onChange={(e) => setEmail(e.target.value)}
					className={errors.email ? 'is-invalid' : ''}
				/>
				{ errors.email && 
				<span className="invalid-feedback">{errors.email}</span>
				}
				<input 
					type="password" 
					name="password" 
					placeholder="Password" 
					autoComplete="on"
					onChange={(e) => setPassword(e.target.value)}
					className={errors.password ? 'is-invalid' : ''}
				/>
				{ errors.password &&
				<span className="invalid-feedback">{errors.password}</span>
				}
				<input type="submit" value="Login"/>
			</form>
		</Fragment>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login)

