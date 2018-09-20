import React, {component} from 'react';


class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SigninEmail : '',
			SigninPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({SigninEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({SigninPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				"email": this.state.SigninEmail,
				"password": this.state.SigninPassword
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 'LogedIn Successfully') {
				this.props.onSignIn(data.user);
				this.props.onRouteChange('home');
			}
			console.log(data);
		})


	}

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 mw6 center">
				<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0 b">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" html-for="email-address" >Email</label>
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
				        <label className="db fw6 lh-copy f6" html-for="password"  >Password</label>
				        <input 
				        	onChange = {this.onPasswordChange} 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" 
				        	autoComplete="current-password"
				        	required />
				      </div>
				    </fieldset>
				    <div>
				      <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <a onClick={()=> this.props.onRouteChange("Register")} href="javascript:;" className="f6 link dim black db">Register</a>
				    </div>
				  </form>
				</main>
			</article>
		);
	}
}

export default SignIn;