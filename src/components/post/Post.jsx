import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase.config";
import { format } from "timeago.js";
import { currentUser } from "../../context/UserContext";

const Post = () => {
  const postCollection = collection(db, "comments");
  const [posts, setPosts] = useState([]);
  const user = useContext(currentUser);
  const [newPost, setNewPost] = useState("");
  const [editId, setEditId] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [commentId,setCommentId] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollection);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [postCollection]);
  const handleUpdate = async (id) => {
    const userDoc = doc(db, "comments", id);
    await updateDoc(userDoc, { posts: newPost });
    setEditId(null);
  };
  const handleDelete = async (id) => {
    const userDoc = doc(db, "comments", id);
    await deleteDoc(userDoc);
  };
  const handleComment = async (id, username) => {
    const userDoc = doc(db, "comments", id);
    await updateDoc(userDoc, {
      comments: arrayUnion({
        comment: userComment,
        commenterUsername: username,
      }),
    });
  };
  return (
    <div className="post">
      <div className="postContainer">
        {posts.map((post, index) => {
          return (
            <article key={index} className="singlePost">
              <div className="singlePostContainer">
                <div className="postTop">
                  <p>
                    <span className="firstLetter">{post?.username[0]}</span>
                    <span className="userName">{post?.username}</span>
                  </p>
                  {post.userId === user?.uid && (
                    <p className="postBtn">
                      <span onClick={() => setEditId(post.id)}>
                        <i className="ri-edit-2-fill"></i>
                      </span>
                      <span onClick={() => handleDelete(post.id)}>
                        <i className="ri-delete-bin-6-line"></i>
                      </span>
                    </p>
                  )}
                </div>
                <span className="createdAt">{format(post.createdAt)}</span>
                {editId === post.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(post.id);
                    }}
                  >
                    <input
                      type="textarea"
                      className="postInput"
                      defaultValue={post.posts}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    <button className="postSubmit updateBtn" type="submit">
                      Modifier le post
                    </button>
                  </form>
                ) : (
                  <p className="userPost">{post.posts}</p>
                )}
                {post.comments.length > 0 && (
                  <p className="commentLabel">Commentaires</p>
                )}

                {post.comments.map((comment, index) => {
                  return (
                    <div className="comment" key={index}>
                      <p>{comment.commenterUsername}</p>
                      <p className="commentText">{comment.comment}</p>
                    </div>
                  );
                })}
                {user ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleComment(commentId, user.displayName);
                      setUserComment("");
                      setCommentId(null)
                    }}
                  >
                    <input
                      type="textarea"
                      className="postInput"
                      placeholder="Comment..."
                      onFocus={()=>setCommentId(post.id)}
                      value={post.id===commentId ? userComment : ""}
                      onChange={(e) => setUserComment(e.target.value)}
                    />
                    <br />
                    <button className="postSubmit" type="submit">
                      Envoyer
                    </button>
                  </form>
                ) : (
                  <p>Connectez vous pour pouvoir commenter</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
