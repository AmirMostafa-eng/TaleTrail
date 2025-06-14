// import React, { useState } from 'react';
import { Fab, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import NavBar from "../components/NavBar";
import PostsPage from "./PostPage";
import { Link } from "react-router";

export default function HomePage(props) {
  const { posts, users, loggedInUserId , handlePostDeleted } = props;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Container maxWidth="lg" className="py-4">
        {/* Create Post Button */}
        <Link to="/post" className="fixed bottom-8 right-8 z-10">
          <Fab
            sx={{ backgroundColor: "var(--dark-gray)", color: "white" }}
            aria-label="add"
          >
            <Add />
          </Fab>
        </Link>
        <PostsPage
          posts={posts}
          users={users}
          loggedInUserId={loggedInUserId}
          handlePostDeleted={handlePostDeleted}
        />
      </Container>
    </div>
  );
}
