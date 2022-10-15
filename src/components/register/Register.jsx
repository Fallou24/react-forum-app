import React, { useState } from "react";
import "./register.css";
import { auth } from "../../utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const Register = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth,(user)=>{
        updateProfile(user,{displayName:pseudo})
      })
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="loginContainer">
        <h1>S'inscrire</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pseudo"
            onChange={(e) => setPseudo(e.target.value)}
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button className="loginBtn">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
