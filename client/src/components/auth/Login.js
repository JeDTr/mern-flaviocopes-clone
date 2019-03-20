import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		}
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name] : e.target.value})
	}
	onSubmit = (e) => {
		e.preventDefault();
		
		this.props.loginUser(this.state);
	}

	render() {

		return (
			<Fragment>
				<h1 className="text-center">Login</h1>
				<form onSubmit={this.onSubmit} noValidate>
					<input 
						type="email" 
						name="email" 
						placeholder="Your Email" 
						onChange={this.onChange}
						className={this.props.errors.email ? 'is-invalid' : ''}
					/>
					{ this.props.errors.email && 
					<span className="invalid-feedback">{this.props.errors.email}</span>
					}
					<input 
						type="password" 
						name="password" 
						placeholder="Password" 
						autoComplete="on"
						onChange={this.onChange}
						className={this.props.errors.password ? 'is-invalid' : ''}
					/>
					{ this.props.errors.password &&
					<span className="invalid-feedback">{this.props.errors.password}</span>
					}
					<input type="submit" value="Login"/>
				</form>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login)

