import React, { useMemo } from "react";

interface KeyboardI {
	attempts: string[];
	answer: string;
}

const Keyboard = ({ attempts, answer }: KeyboardI) => {
	let keyRows = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L"],
		["Z", "X", "C", "V", "B", "N", "M"],
	];

	let doneKeys = useMemo(() => {
		let memo = {} as any;

		attempts.forEach((attempt) => {
			attempt.split("").forEach((letter, i) => {
				if (letter === answer[i]) memo[letter] = "green";
				if (answer.includes(letter)) {
					if (memo[letter] !== "green") {
						memo[letter] = "yellow";
					}
				} else {
					memo[letter] = "gray";
				}
			});
		});
		return memo;
	}, [attempts, answer]);

	return (
		<div className="keyboard">
			{keyRows.map((keys) => (
				<div className="keyboard-row">
					{keys.map((key) => (
						<div className={`key-square ${doneKeys[key]}`}>
							<p>{key}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Keyboard;
