import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostPublish from "./pages/PostPublish";
import { useEffect, useState } from "react";
import axios from "./api/axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  let loggedInUserId = sessionStorage.getItem('loggedUser') || null ;

  // console.log(loggedInUserId)

  const handlePublishPost = (post) => {
    setPosts([...posts,post]);
  }

  const handlePostDeleted = (post) => {
    const newPosts = [...posts];
    newPosts.filter((p)=> p.id !== post.id);
    setPosts([...posts]);
  }

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, usersRes] = await Promise.all([
        axios.get("/posts"),
        axios.get("/users"),
      ]);
      setPosts(postsRes.data);
      setUsers(usersRes.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login users={users} loggedInUserId={loggedInUserId}/>} />
        <Route path="/signup" element={<Signup users={users}/>} />
        <Route
          path="/"
          element={
            <HomePage
              posts={posts}
              users={users}
              loggedInUserId={loggedInUserId}
              handlePostDeleted={handlePostDeleted}
            />
          }
        />
        <Route path="/post" element={<PostPublish loggedInUserId={loggedInUserId} handlePublishPost={handlePublishPost}/>} />
      </Routes>
    </>
  );
}

export default App;
