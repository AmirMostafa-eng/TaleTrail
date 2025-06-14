import React from 'react';
import axios from '../api/axios';
import PostCard from '../components/PostCard';
import Modal from '@mui/material/Modal';
import { Box, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #F5F5F5',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
};

export default function PostsPage(props) {
  
  const {posts , users , loggedInUserId , handlePostDeleted , handleEditPost} = props;
  const getUser = (id) => users.find((user) => user.id === id);

  const [open, setOpen] = React.useState(false);
  const [postToDelete, setPostToDelete] = React.useState(null);
  const handleOpen = (post) => {
    setOpen(true);
    setPostToDelete(post)
    console.log(postToDelete);
  }
  const handleClose = () => setOpen(false);

  // let isDelete = false;
  const handleDeletePost = async (e) =>{
    e.preventDefault();
    if(postToDelete){
      // setPosts((preValue)=> [...preValue.filter(post => post.id !== postToDelete.id)])
      await axios.delete(`http://localhost:3001/posts/${postToDelete.id}`);
    }
    handleClose();
    handlePostDeleted(postToDelete);
  }

  return (
    <div style={{ padding: 20 }}>
      {posts.map((post) => {
        const user = getUser(post.publisherId);
        return user ? (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            isOwner={post.publisherId === loggedInUserId}
            handleOpen={handleOpen}
            handleEditPost = {handleEditPost}
          />
        ) : null;
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            Are you sure you want to delete this post ?
          </Typography>
          <Box display="flex" justifyContent="center" marginTop={4} gap={2}>
            <Button color="error" onClick={handleDeletePost}>Delete</Button>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

