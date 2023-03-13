import React from "react";
import LetterSquare from "./LetterSquare";

const size = [0, 1, 2, 3, 4];

interface WordAttemptI {
	currentLetters: string;
}

const WordAttempt = ({ currentLetters }: WordAttemptI) => {
	return (
		<div className="word-div">
			{size.map((index) => (
				<LetterSquare key={index} letter={currentLetters[index]} />
			))}
		</div>
	);
};

export default WordAttempt;
