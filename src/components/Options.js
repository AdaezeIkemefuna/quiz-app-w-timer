import React from "react";

export default function Options({ opt, i, answer, dispatch, question }) {
  const answered = answer !== null;
  return (
    <button
      className={`btn btn-option ${i === answer ? "answer" : ""} ${
        answered && (i === question.correctOption ? "correct" : "wrong")
      }`}
      key={i}
      disabled={answered}
      onClick={() => dispatch({ type: "newAnswer", payload: i })}
    >
      {opt}
    </button>
  );
}
