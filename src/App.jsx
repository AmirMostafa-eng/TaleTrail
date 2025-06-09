import { Route, Routes } from "react-router";
import ExplorePosts from "./pages/ExplorePosts";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostPublish from "./pages/PostPublish";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/" element={<HomePage />}/>
        {/* <ExplorePosts /> */}
        <Route path="/post" element={<PostPublish />}/>
      </Routes>
    </>
  );
}

export default App;
