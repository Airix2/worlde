import React, { useEffect, useRef, useState } from "react";
import WordAttempt from "./WordAttempt";
import WordAttemptDone from "./WordAttemptDone";
import Keyboard from "./Keyboard";

import { data } from "./data";

const size = [0, 1, 2, 3, 4, 5];

function App() {
	const appRef = useRef(null);
	const [answer, setAnswer] = useState<string>("");
	const [currentLetters, setCurrentLetters] = useState<string>("");
	const [attempts, setAttempts] = useState<string[]>([]);
	const [found, setFound] = useState<number>(0);

	const keyPressed = (e: globalThis.KeyboardEvent) => {
		if (found !== 0) return;

		if (e.key === "Backspace") {
			setCurrentLetters((pastLetters) =>
				pastLetters.slice(0, pastLetters.length - 1)
			);
		}

		if (e.keyCode >= 65 && e.keyCode <= 90) {
			if (currentLetters.length <= 4) {
				setCurrentLetters(
					(pastLetters) => `${pastLetters}${e.key.toUpperCase()}`
				);
			}
		}

		if (e.key === "Enter" && currentLetters.length === 5) {
			if (currentLetters === answer.toUpperCase()) {
				setFound(1);
			} else if (attempts.length === size.length - 1) {
				setFound(-1);
			}
			setAttempts([...attempts, currentLetters]);
			setCurrentLetters("");
		}
	};

	useEffect(() => {
		const randomWord = data[Math.floor(Math.random() * data.length)];
		setAnswer(randomWord);
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", keyPressed);
		return () => window.removeEventListener("keydown", keyPressed);
		// eslint-disable-next-line
	}, [currentLetters, answer]);

	return (
		<div className="App" ref={appRef} tabIndex={0}>
			<h1>Wordle</h1>
			<div className="messages">
				{found === 1 && <p>You did it!</p>}
				{found === -1 && <p>Sorry, you ran out of attempts!</p>}
			</div>

			<div className="play-field">
				{[0, 1, 2, 3, 4, 5].map((rowIndex) => {
					if (rowIndex === attempts.length) {
						return <WordAttempt currentLetters={currentLetters} />;
					} else {
						return (
							<WordAttemptDone
								key={rowIndex}
								word={attempts[rowIndex] || ""}
								answer={answer}
							/>
						);
					}
				})}
			</div>
			<Keyboard attempts={attempts} answer={answer} />
		</div>
	);
}

export default App;
