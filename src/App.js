import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import { useReducer } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishedQuiz from "./components/FinishedQuiz";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { questions } from "./data/questionsOffline";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: questions,
  status: "ready", //loading, ready, active, error, finished
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeLeft: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timeLeft: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points >= state.highScore ? state.points : state.highScore,
      };
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "timer":
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
        status: state.timeLeft === 0 ? "finished" : state.status,
        highScore:
          state.points >= state.highScore ? state.points : state.highScore,
      };

    default:
      throw new Error("unknown action");
  }
};

const App = () => {
  const [
    { questions, status, index, answer, points, highScore, timeLeft },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  // useEffect(() => {
  //   fetch("http://localhost:9000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed" }));
  // }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} timeLeft={timeLeft} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                questions={questions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedQuiz
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
