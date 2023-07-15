import React from "react";

export default function NextQuestion({ answer, dispatch, index, questions }) {
  const lastQuestion = index === questions.length - 1;

  if (answer === null) return null;
  return (
    <>
      {lastQuestion ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finishQuiz" })}
        >
          Finish
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
    </>
  );
}
