import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router";

export default function PostCard({
  post,
  user,
  isOwner,
  handleOpen,
  handleEditPost,
}) {
  const avatarLetter = user.name.charAt(0).toUpperCase();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
            <Avatar
              sx={{ backgroundColor: "var(--dark-gray)", cursor: "pointer" }}
            >
              {avatarLetter}
            </Avatar>
          </Link>
        }
        action={
          isOwner && (
            <div>
              <Link to="/post">
                <IconButton onClick={() => handleEditPost(post)}>
                  <EditIcon sx={{ color: "var(--mustard-yellow)" }} />
                </IconButton>
              </Link>
              <IconButton onClick={() => handleOpen(post)}>
                <DeleteIcon sx={{ color: "var(--soft-red)" }} />
              </IconButton>
            </div>
          )
        }
        title={
          <Link
            to={`/user/${user.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {user.name}
          </Link>
        }
        subheader={post.publishedAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h5" fontSize={18} fontWeight={500}>
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "var(--dark-gray)" }}
          fontSize={12}
        >
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
