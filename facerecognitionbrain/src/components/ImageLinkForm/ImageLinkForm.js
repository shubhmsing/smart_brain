import React from 'react';


const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return (
		<div>
			<p className="f3">
				{'This magic brain will detect face in your picture.'}
			</p>
			<div className="center w-100">
				<div className="center pa4 br3 shadow-5">
				<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
				<button className="br3 shadow-5 ma2 f8 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;