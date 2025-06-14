import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { Margin } from '@mui/icons-material';
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import axios from '../api/axios';
// import { useState } from 'react';

export default function PostCard({ post, user, isOwner }) {
  const avatarLetter = user.name.charAt(0).toUpperCase();

  return (
    <Card
      sx={{ marginX: "auto", marginBottom: 3, maxWidth: 500, width: "100%" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "var(--dark-gray)" }}>
            {avatarLetter}
          </Avatar>
        }
        action={
          isOwner && (
            <div>
              <Link to="/post">
                <IconButton>
                  <EditIcon sx={{ color: "var(--mustard-yellow)" }} />
                </IconButton>
              </Link>
              <IconButton>
                <DeleteIcon sx={{ color: "var(--soft-red)" }} />
              </IconButton>
            </div>
          )
        }
        title={user.name}
        subheader={post.publishedAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h5" fontSize={20} fontWeight={500}>{post.title}</Typography>
        <Typography variant="body1" fontSize={14}>{post.content}</Typography>
      </CardContent>
    </Card>
  );
}
