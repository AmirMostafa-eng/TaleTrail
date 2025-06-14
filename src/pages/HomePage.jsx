// import React, { useState } from 'react';
import { Fab, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import NavBar from "../components/NavBar";
import PostsPage from "./PostPage";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

export default function HomePage(props) {
  const { posts, users, handlePostDeleted ,currentUser ,handleLogOut , handleEditPost ,handleNewPost } = props;
  const navigate = useNavigate();

  const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
  useEffect(()=>{
    if (!loggedUser) {
      navigate('/login');
    }
  },[currentUser , navigate , loggedUser]);


  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userName = {loggedUser && loggedUser.name} handleLogOut={handleLogOut}/>
      <Container maxWidth="lg" className="py-4">
        {/* Create Post Button */}
        <Link to="/post" onClick={handleNewPost} className="fixed bottom-8 right-8 z-10">
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
          loggedInUserId={loggedUser && loggedUser.id}
          handlePostDeleted={handlePostDeleted}
          handleEditPost = {handleEditPost}
        />
      </Container>
    </div>
  );
}
