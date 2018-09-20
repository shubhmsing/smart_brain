import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import Brain from './images/brain.png'

const Logo = () => {
	return (
		<div className="mt4 ml4">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 15 }} style={{ height: 100, width: 100 }} >
	 			<div className="Tilt-inner pa3"><img style={{'paddingTop': '10px'}} src={Brain} alt="logo"/></div>
			</Tilt>
		</div>
	);
}

export default Logo;