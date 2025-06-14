// pages/PostPublish.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Chip,
  Container,
  FormHelperText,
} from "@mui/material";
import ContentTextField from "../components/ContextTextField";
import ImageUploader from "../components/ImageUploader";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router";
import axios from "../api/axios";
import TitleTextField from "../components/TitleTextField";

export default function PostPublish(props) {
  const { loggedInUserId, post, handlePublishPost, handleEditPost } = props;

  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [featuredImage, setFeaturedImage] = useState(post ? post.image : null);
  const [emptyImage, setEmptyImage] = useState(false);

  const navigate = useNavigate();
  const date = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (featuredImage == null) {
      setEmptyImage(true);
      return;
    }

    const dataToSend = {
      publisherId: loggedInUserId,
      title: title,
      content: content,
      image: featuredImage,
      publishedAt: `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
    };

    console.log(dataToSend);
    const token = sessionStorage.getItem("token");
    if (!post) {
      const newPost = await axios.post(
        "http://localhost:3001/posts",
        dataToSend
      );
      handlePublishPost(newPost);
    } else {
      axios
        .patch(
          `/posts/${post.id}`,
          { image: featuredImage, title: title, content: content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("Updated successfully", res.data);
        })
        .catch((err) => {
          console.error("Error updating post", err);
        });
    }
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ marginY: "20px" }}>
        <div className="max-w-5xl mx-auto bg-base-100 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gray-800 p-6 text-primary-content">
            <h1 className="text-3xl font-bold">
              {post ? "Edit Your Post" : "Create New Post"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <TitleTextField title={title} setTitle={setTitle} />

            <ContentTextField content={content} setContent={setContent} />

            <ImageUploader
              setEmptyImage={setEmptyImage}
              featuredImage={featuredImage}
              setFeaturedImage={setFeaturedImage}
            />
            {emptyImage && (
              <FormHelperText sx={{ textAlign: "center" }} error>
                please choose an image
              </FormHelperText>
            )}

            <div className="flex items-center gap-4 justify-center p-4 bg-base-200 rounded-lg">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                {post ? "Update" : "Publish Post"}
              </Button>
              {post && <Button variant="outlined" color="error" size="large"><Link to='/'>cancel</Link></Button>}
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
