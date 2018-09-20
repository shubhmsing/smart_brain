import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({box, imgSrc}) => {
	return (
		<div className='center ma'>
			<div className="absolute mt2">
				{imgSrc ? <img id="inputImage" className='br4 shadow-5 ' width="500px" height="auto" src={imgSrc} alt="faceDetectedImage"/>: null}
				<div className="bounding-box" style={{'left': box.leftCol, 'top': box.topRow, 'right': box.rightCol, 'bottom': box.bottomRow}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;