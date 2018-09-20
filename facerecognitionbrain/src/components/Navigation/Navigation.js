import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn) {
		return (
			<nav style={{'float': 'right', 'display': 'flex', 'justifyContent': 'flex-end'}}>
				<a onClick={() => onRouteChange('SignIn')} href="javascript:;" className="f3 link dim black underline pa3 pointer">Sign Out</a>
			</nav>
		);
	} else {
		return(
			<nav style={{'float': 'right', 'display': 'flex', 'justifyContent': 'flex-end'}}>
				<a onClick={() => onRouteChange('SignIn')} href="javascript:;" className="f3 link dim black underline pa3 pointer">Sign In</a>
				<a onClick={() => onRouteChange('Register')} href="javascript:;" className="f3 link dim black underline pa3 pointer">Register</a>
			</nav>
		);
	}
}

export default Navigation;