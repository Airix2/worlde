import React from "react";

interface letterSquareI {
	letter: string;
	color?: string;
}

const LetterSquare = ({ letter, color }: letterSquareI) => {
	return (
		<div className={`letter-square ${color ? color : ""}`}>
			{/* <input type="text" autoComplete="false" maxLength={1} /> */}
			<p>{letter}</p>
		</div>
	);
};

export default LetterSquare;
