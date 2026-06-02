
import { useState } from "react";
import Login from "./Login";
import Admin from "./Admin";
import Quiz from "./Quiz";
import Leaderboard from "./Leaderboard";

function App() {

  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>

      <button onClick={() => setPage("quiz")}>
        Quiz
      </button>

      <button onClick={() => setPage("admin")}>
        Admin
      </button>

      <button onClick={() => setPage("leaderboard")}>
        Leaderboard
      </button>

      {page === "quiz" && <Quiz />}

      {page === "leaderboard" && <Leaderboard />}

      {page === "admin" &&
        (
          isLoggedIn
            ? <Admin />
            : <Login setIsLoggedIn={setIsLoggedIn} />
        )
      }

    </div>
  );
}

export default App;
