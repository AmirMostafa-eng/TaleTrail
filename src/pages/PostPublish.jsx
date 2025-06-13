// pages/PostPublish.jsx
import React, { useState } from 'react';
import { TextField, Button, Chip, Container } from '@mui/material';
import ContentTextField from '../components/ContextTextField';
import ImageUploader from '../components/ImageUploader';
import NavBar from '../components/NavBar';


const PostPublish = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      content,
      featuredImage,
    });
  };

  return (
    <>
    <NavBar />
    <Container maxWidth="sm" sx={{ marginY: "20px" }} >
      <div className="max-w-5xl mx-auto bg-base-100 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gray-800 p-6 text-primary-content">
          <h1 className="text-3xl font-bold">Create New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <TextField
            fullWidth
            label="Post Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ marginBottom: '20px' }}
          />

          <ContentTextField content={content} setContent={setContent} />

          <ImageUploader 
            featuredImage={featuredImage} 
            setFeaturedImage={setFeaturedImage} 
          />

          <div className="flex items-center justify-center p-4 bg-base-200 rounded-lg">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </Container> 
    </>
  );
};

export default PostPublish;