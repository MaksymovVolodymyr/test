import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';


class Form extends Component {
	constructor (props) {
  		super(props);
  		this.state = {
    		login: '',
    		password: '',
    		formErrors: {login: '', password: ''},
    		loginValid: false,
    		passwordValid: false,
    		formValid: false
  		}
	}

	handleUserInput = (e) => {
    	const name = e.target.name;
    	const value = e.target.value;
    	this.setState({[name]: value},
        () => { this.validateField(name, value) });
  	}

  	validateField(fieldName, value) {
    	let fieldValidationErrors = this.state.formErrors;
    	let loginValid = this.state.loginValid;
    	let passwordValid = this.state.passwordValid;

    	switch(fieldName) {
      		case 'login':
        		loginValid = value.length > 0;
        		fieldValidationErrors.login = loginValid ? '' : ' is too short';
        	break;
      		case 'password':
        		passwordValid = value.length >= 4;
        		fieldValidationErrors.password = passwordValid ? '': ' is too short';
        	break;
      		default:
        		break;
    	}
    	this.setState({
    		formErrors: fieldValidationErrors,
            loginValid: loginValid,
            passwordValid: passwordValid
            }, this.validateForm
        );
  	}	

  	validateForm() {
    	this.setState({formValid: this.state.loginValid && this.state.passwordValid});
  	}

  	errorClass(error) {
    	return(error.length === 0 ? '' : 'has-error');
  	}

  	onSubmit(event){
      event.preventDefault();
      /* todo need ajax */
      alert('Welcome');     
    }

 	render () {
   		return (
     		<form onSubmit={this.onSubmit} className="login-form">
       			<div className="panel panel-default">
          			<FormErrors formErrors={this.state.formErrors} />
        		</div>
        		<div className={`form-group ${this.errorClass(this.state.formErrors.login)}`}>
          			<label htmlFor="lofin">Login</label>
          			<input type="text" required className="form-control" name="login"
            		placeholder="Login"
            		value={this.state.login}
            		onChange={this.handleUserInput}  />
        		</div>
        		<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          			<label htmlFor="password">Password</label>
          			<input type="password" className="form-control" name="password"
            		placeholder="Password"
            		value={this.state.password}
            		onChange={this.handleUserInput}  />
        		</div>
        		<button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
     		</form>
   		)
 	}
}


export default Form;