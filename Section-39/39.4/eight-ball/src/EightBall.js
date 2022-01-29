import React, { useState } from "react";
import './EightBall.css'

const EightBall = ({ answers }) => {
    const [answer, setAnswer] = useState({ msg: 'Think of a question', color: 'black' });

    function resetEightBall(answers, setAnswer) {
        const nextAnswer = answers[Math.floor(Math.random() * answers.length)];
        setAnswer(nextAnswer);
    }
    return (
        <div className="EightBall" style={{ backgroundColor: answer.color }} onClick={() => resetEightBall(answers, setAnswer)}>
            <h1 className="EightBall-text">{answer.msg}</h1>
        </div >
    )
}

export default EightBall;