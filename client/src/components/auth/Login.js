import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { loginUser } from '../../actions/authActions';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (props.auth.isAuthenticated) {
			props.history.push('/dashboard');
		}
	})

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.auth.isAuthenticated) {
	// 		this.props.history.push('/dashboard');
	// 	}
	// }

	const onSubmit = (e) => {
		e.preventDefault();
		
		props.loginUser({email, password});
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
					className={props.errors.email ? 'is-invalid' : ''}
				/>
				{ props.errors.email && 
				<span className="invalid-feedback">{props.errors.email}</span>
				}
				<input 
					type="password" 
					name="password" 
					placeholder="Password" 
					autoComplete="on"
					onChange={(e) => setPassword(e.target.value)}
					className={props.errors.password ? 'is-invalid' : ''}
				/>
				{ props.errors.password &&
				<span className="invalid-feedback">{props.errors.password}</span>
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

