import { useState, useEffect } from "react";

function Quiz() {

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  useEffect(() => {

    if (showScore || questions.length === 0) return;

    const interval = setInterval(() => {

      setTimer((prev) => {

        if (prev === 1) {

          handleAnswer("");

          return 30;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(interval);

  }, [currentQuestion, showScore, questions]);

  const handleAnswer = async (selectedAnswer) => {

    let finalScore = score;

    if (
      selectedAnswer ===
      questions[currentQuestion].correctAnswer
    ) {
      finalScore = score + 1;
      setScore(finalScore);
    }

    setTimer(30);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {

      setCurrentQuestion(nextQuestion);

    } else {

      await fetch("http://localhost:8080/scores/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: "Rushikesh",
          score: finalScore
        })
      });

      setShowScore(true);
    }
  };

  return (
    <div className="App">

      <h1>Online Quiz App</h1>

      {questions.length > 0 ? (

        showScore ? (

          <div>
            <h2>
              Your Score: {score}/{questions.length}
            </h2>
          </div>

        ) : (

          <div>

            <h3>⏰ Time Left: {timer} sec</h3>

            <h2>
              {questions[currentQuestion].questionTitle}
            </h2>

            <button
              onClick={() =>
                handleAnswer(
                  questions[currentQuestion].option1
                )
              }
            >
              {questions[currentQuestion].option1}
            </button>

            <br /><br />

            <button
              onClick={() =>
                handleAnswer(
                  questions[currentQuestion].option2
                )
              }
            >
              {questions[currentQuestion].option2}
            </button>

            <br /><br />

            <button
              onClick={() =>
                handleAnswer(
                  questions[currentQuestion].option3
                )
              }
            >
              {questions[currentQuestion].option3}
            </button>

            <br /><br />

            <button
              onClick={() =>
                handleAnswer(
                  questions[currentQuestion].option4
                )
              }
            >
              {questions[currentQuestion].option4}
            </button>

          </div>

        )

      ) : (

        <h2>Loading Questions...</h2>

      )}

    </div>
  );
}

export default Quiz;
