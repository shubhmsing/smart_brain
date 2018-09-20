import React from 'react';


class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}
	
	onSubmitForm = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === "Registered Successfully") {
				this.props.onRegister(data.user);
				this.props.onRouteChange('SignIn');
			}
		});
	}

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 mw6 center">
				<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0 b">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" html-for="name">Name</label>
				        <input
				        	onChange = {this.onNameChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="name"  
				        	id="name" 
				        	autoComplete="name" 
				        	required/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" html-for="email-address">Email</label>
				        <input
				        	onChange = {this.onEmailChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	autoComplete="email" 
				        	required/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" html-for="password" required>Password</label>
				        <input 
				        	onChange = {this.onPasswordChange}
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	autoComplete="current-password"
				        	required/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" html-for="re-password" required>Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="re-password"  id="re-password" autoComplete="current-password"/>
				      </div>

				    </fieldset>
				    <div>
				      <input onClick={this.onSubmitForm} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register"/>
				    </div>
				  </form>
				</main>
			</article>
		);
	}
}

export default Register;