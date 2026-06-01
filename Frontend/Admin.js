import { useState, useEffect } from "react";
import "./App.css";

function Admin() {

  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);

  const [question, setQuestion] = useState({
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: ""
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  };

  const handleChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (editId) {

    await fetch(
      `http://localhost:8080/questions/update/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
      }
    );

    alert("Question Updated!");

    setEditId(null);

  } else {

    await fetch("http://localhost:8080/questions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    });

    alert("Question Added!");
  }

  fetchQuestions();

  setQuestion({
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: ""
  });
};

  // DELETE QUESTION
  const deleteQuestion = async (id) => {

    await fetch(`http://localhost:8080/questions/delete/${id}`, {
      method: "DELETE"
    });

    alert("Question Deleted!");

    fetchQuestions();
  };

  return (
    <div className="App">

      <h1>Add Question</h1>

      <form onSubmit={handleSubmit} className="quiz-box">

        <input
          type="text"
          name="questionTitle"
          placeholder="Question"
          value={question.questionTitle}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option1"
          placeholder="Option 1"
          value={question.option1}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option2"
          placeholder="Option 2"
          value={question.option2}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option3"
          placeholder="Option 3"
          value={question.option3}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="option4"
          placeholder="Option 4"
          value={question.option4}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="correctAnswer"
          placeholder="Correct Answer"
          value={question.correctAnswer}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
  {editId ? "Update Question" : "Add Question"}
</button>

      </form>

      <hr />

      <h2>All Questions</h2>

      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px"
          }}
        >

          <h3>{q.questionTitle}</h3>

          <p>{q.option1}</p>
          <p>{q.option2}</p>
          <p>{q.option3}</p>
          <p>{q.option4}</p>



          <button onClick={() => {

  setEditId(q.id);

  setQuestion({
    questionTitle: q.questionTitle,
    option1: q.option1,
    option2: q.option2,
    option3: q.option3,
    option4: q.option4,
    correctAnswer: q.correctAnswer
  });

}}>
  Edit
</button>

          <button
  className="delete-btn"
  onClick={() => deleteQuestion(q.id)}
>
  Delete
</button>

        </div>
      ))}

    </div>
  );
}

export default Admin;