import React, { useContext, useState } from "react";
import "./app.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import MessageModal from "./components/messageModal/MessageModal";
import Post from "./components/post/Post";
import { currentUser } from "./context/UserContext";

const App = () => {
  const [haveAccount, setHaveAccount] = useState(false);
  const user = useContext(currentUser)
  return (
    <div className="app">
      <div className="appContainer">
        {user ? (
          <MessageModal />
        ) : (
          <>
            <div className="btnContainer">
              <button
                className={!haveAccount ? "appBtn active" : "appBtn"}
                onClick={() => setHaveAccount(false)}
              >
                S'inscire
              </button>
              <button
                className={haveAccount ? "appBtn active" : "appBtn"}
                onClick={() => setHaveAccount(true)}
              >
                Se connecter
              </button>
            </div>
            {haveAccount ? <Login /> : <Register />}
          </>
        )}
      </div>
      <Post />
    </div>
  );
};

export default App;
