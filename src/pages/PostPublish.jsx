// pages/PostPublish.jsx
import React, { useState } from 'react';
import { TextField, Button, Chip, Container, FormHelperText } from '@mui/material';
import ContentTextField from '../components/ContextTextField';
import ImageUploader from '../components/ImageUploader';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router';
import axios from '../api/axios';
import TitleTextField from '../components/TitleTextField';


export default function PostPublish(props){
  const {loggedInUserId , post , handlePublishPost} = props;
  
  const [title, setTitle] = useState(post? post.title : '');
  const [content, setContent] = useState(post? post.content : '');
  const [featuredImage, setFeaturedImage] = useState(post? post.image : null);
  const [emptyImage , setEmptyImage] = useState(false);

  const navigate = useNavigate();
  const date = new Date();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (featuredImage == null) {
      setEmptyImage(true) ;
      return;
    }
    
    const dataToSend = {
    publisherId: loggedInUserId,
    title:title,
    content: content,
    image: featuredImage,
    publishedAt:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }
    console.log(dataToSend);

    const newPost = await axios.post('http://localhost:3001/posts' , dataToSend);
    handlePublishPost(newPost);

    navigate('/');
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
          <TitleTextField title={title} setTitle={setTitle}/>

          <ContentTextField content={content} setContent={setContent} />

          <ImageUploader 
            setEmptyImage ={setEmptyImage}
            featuredImage={featuredImage} 
            setFeaturedImage={setFeaturedImage} 
          />
          {emptyImage &&<FormHelperText sx={{textAlign: 'center'}} error>please choose an image</FormHelperText>}

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
