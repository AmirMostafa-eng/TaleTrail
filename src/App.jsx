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
  let loggedInUser = JSON.parse(sessionStorage.getItem('loggedUser')) || null ;
  const [currentUser , setCurrentUser] = useState(loggedInUser);

  // console.log(loggedInUserId)
  const handleLogIn =()=>{
    setCurrentUser(JSON.parse(sessionStorage.getItem('loggedUser')) );
  }
  const handleLogOut =()=>{
    setCurrentUser(null);
  }

  const handlePublishPost = (post) => {
    setPosts([...posts,post]);
  }

  const handlePostDeleted = (post) => {
    const newPosts = [...posts];
    newPosts.filter((p)=> p.id !== post.id);
    setPosts([...posts]);
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem('loggedUser')) || null);
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
        <Route path="/login" element={<Login users={users} loggedInUser={currentUser && currentUser} handleLogIn ={handleLogIn}/>} />
        <Route path="/signup" element={<Signup users={users}/>} />
        <Route
          path="/"
          element={
            <HomePage
              posts={posts}
              users={users}
              handlePostDeleted={handlePostDeleted}
              currentUser = {currentUser}
              handleLogOut = {handleLogOut}
              
            />
          }
        />
        <Route path="/post" element={<PostPublish loggedInUserId={loggedInUser && loggedInUser.id} handlePublishPost={handlePublishPost}/>} />
      </Routes>
    </>
  );
}

export default App;
