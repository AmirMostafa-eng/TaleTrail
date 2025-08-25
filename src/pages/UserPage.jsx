import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "../api/axios";
import PostCard from "../components/PostCard";
import { Typography, Box, Container } from "@mui/material";
import Masonry from "react-masonry-css";
import LazyLoad from "react-lazy-load";
import "./PostPage.css";
import NavBar from "../components/NavBar";

export default function UserPage() {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  const isLoggedUserProfile = loggedUser && loggedUser.id === parseInt(userId);

  const handlePostDeleted = async (deletedPost) => {
    setUserPosts((prev) => prev.filter((post) => post.id !== deletedPost.id));
  };

  const handleEditPost = (post) => {
    navigate("/post", { state: { post } });
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("loggedUser");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(
          `http://localhost:3001/users/${userId}`
        );
        setUser(userResponse.data);

        // Fetch user's posts
        const postsResponse = await axios.get(
          `http://localhost:3001/posts?publisherId=${userId}`
        );
        setUserPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserAndPosts();
  }, [userId]);

  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
  };

  if (!user) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        userName={loggedUser && loggedUser.name}
        userId={loggedUser && loggedUser.id}
        handleLogOut={handleLogOut}
      />
      <Container maxWidth="lg">
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
            {isLoggedUserProfile ? "Your Posts" : `${user.name}'s Posts`}
          </Typography>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {userPosts.map((post) => (
              <div key={post.id} className="masonry-item">
                <LazyLoad offset={100} threshold={0.1}>
                  <PostCard
                    post={post}
                    user={user}
                    isOwner={isLoggedUserProfile}
                    handleOpen={handlePostDeleted}
                    handleEditPost={handleEditPost}
                  />
                </LazyLoad>
              </div>
            ))}
          </Masonry>
        </Box>
      </Container>
    </div>
  );
}
