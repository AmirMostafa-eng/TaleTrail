import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  TextField,
  Fab,
  Box,
  Grid,
  Container
} from '@mui/material';
import { 
  Menu, 
  Search, 
  Add, 
  Favorite, 
  Share, 
  MoreVert, 
  Home, 
  Explore, 
  Notifications, 
  Mail, 
  Bookmark 
} from '@mui/icons-material';
import NavBar from '../components/NavBar';
import PostsPage from './PostPage';
import { Link } from 'react-router';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample plog posts data

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // const handleLike = (postId) => {
  //   setPosts(posts.map(post => 
  //     post.id === postId ? {...post, likes: post.likes + 1} : post
  //   ));
  // };

  // const filteredPosts = posts.filter(post =>
  //   post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  // );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* {/* Main Content */}
      <Container maxWidth="lg" className="py-8">
        {/* Create Post Button */}
        <Link to="/post" className="fixed bottom-8 right-8 z-10">
          <Fab sx={{backgroundColor: "var(--dark-gray)" , color: "white"}} aria-label="add">
            <Add />
          </Fab>
        </Link>
        <PostsPage />
      </Container>
    </div>
  );
}
