import React, { createRef, useContext } from "react";
import "./messageModal.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../../utils/firebase.config";
import { currentUser } from "../../context/UserContext";
import { addDoc, collection } from "firebase/firestore";

const MessageModal = () => {
  function handleLogout() {
    signOut(auth);
  }
  const user = useContext(currentUser);
  const postRef = createRef();
  const postCollection = collection(db, "comments");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(postCollection, {
      comments: [],
      createdAt: Date.now(),
      posts: postRef.current.value,
      userId: user.uid,
      username: user.displayName,
    });
    postRef.current.value=""
  };
  return (
    <div className="message">
      <div className="messageTop">
        <p>
          <span className="firstLetter">{user?.displayName[0]}</span>
          <span className="pseudo">{user?.displayName}</span>
        </p>
        <p className="logout" onClick={handleLogout}>
          <i className="ri-logout-box-r-line"></i>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="textarea"
          placeholder="Message..."
          className="messageInput"
          ref={postRef}
        />
        <br />
        <button className="msgBtn">Envoyer</button>
      </form>
    </div>
  );
};

export default MessageModal;
