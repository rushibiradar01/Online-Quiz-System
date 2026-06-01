import { useEffect, useState } from "react";

function Leaderboard() {

  const [scores, setScores] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/scores")
      .then((response) => response.json())
      .then((data) => {

        data.sort((a, b) => b.score - a.score);

        setScores(data);
      });

  }, []);

  return (
    <div className="App">

      <h1>🏆 Leaderboard</h1>

      {scores.map((s, index) => (

        <div
          key={s.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>Rank #{index + 1}</h3>
          <p>User: {s.username}</p>
          <p>Score: {s.score}</p>
        </div>

      ))}

    </div>
  );
}

export default Leaderboard;