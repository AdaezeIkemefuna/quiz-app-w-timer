import React from "react";
import Options from "./Options";

const Question = ({ question, dispatch, answer }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((opt, i) => (
          <Options
            opt={opt}
            i={i}
            dispatch={dispatch}
            answer={answer}
            key={opt}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
