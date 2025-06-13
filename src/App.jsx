import { Route, Routes } from "react-router";
import ExplorePosts from "./pages/ExplorePosts";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostPublish from "./pages/PostPublish";
import PostsPage from "./pages/PostPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/" element={<HomePage />}/>
        {/* <ExplorePosts /> */}
        <Route path="/p" element={<PostsPage />}/>
        <Route path="/post" element={<PostPublish />}/>
      </Routes>
    </>
  );
}

export default App;
