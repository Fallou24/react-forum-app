import React, { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.config";

export const currentUser = createContext(null);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (current) => {
    setUser(current);
  });
  return <currentUser.Provider value={user}>{children}</currentUser.Provider>;
};

export default UserContext;
