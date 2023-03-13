import React, { useMemo } from "react";
import LetterSquare from "./LetterSquare";

interface WordI {
	word: string;
	answer: string;
}

const WordAttemptDone = ({ word, answer }: WordI) => {
	const colors = useMemo(() => {
		return word.split("").map((letter, i) => {
			if (letter === answer[i]) return "green";
			if (answer.includes(letter)) return "yellow";
			else return "gray";
		});
	}, [word, answer]);

	if (word === "")
		return (
			<div className="word-div">
				{[0, 1, 2, 3, 4].map((letter, i) => (
					<LetterSquare key={i} letter={""} />
				))}
			</div>
		);

	return (
		<div className="word-div">
			{word.split("").map((letter, i) => (
				<LetterSquare key={i} letter={letter} color={colors[i]} />
			))}
		</div>
	);
};

export default WordAttemptDone;
