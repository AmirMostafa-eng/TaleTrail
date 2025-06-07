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

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample plog posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'travel_enthusiast',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1691494314694-2e5acbfb1cfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3Vuc2V0JTIwc3Vuc2V0fGVufDB8fDB8fHww',
      caption: 'Sunset views in Bali never disappoint! #travel #bali #sunset',
      likes: 243,
      tags: ['travel', 'bali', 'sunset'],
      date: '2 days ago'
    },
    {
      id: 2,
      username: 'food_explorer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: 'Tokyo, Japan',
      image: 'https://source.unsplash.com/random/800x600/?sushi',
      caption: 'Authentic sushi experience in Tokyo! #food #japan #sushi',
      likes: 187,
      tags: ['food', 'japan', 'sushi'],
      date: '1 day ago'
    },
    {
      id: 3,
      username: 'urban_photographer',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      location: 'New York, USA',
      image: 'https://source.unsplash.com/random/800x600/?newyork',
      caption: 'City lights and urban vibes. #photography #nyc #urban',
      likes: 312,
      tags: ['photography', 'nyc', 'urban'],
      date: '3 hours ago'
    }
  ]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? {...post, likes: post.likes + 1} : post
    ));
  };

  const filteredPosts = posts.filter(post =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Bar */}
      <AppBar position="sticky" className="bg-white text-black shadow-sm">
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="mr-2"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className="font-bold">
              Plog
            </Typography>
          </div>
          
          <div className="flex-grow mx-4">
            <div className="relative max-w-md mx-auto">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search posts or tags..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search className="text-gray-400 mr-2" />
                  ),
                  className: "rounded-full bg-gray-100"
                }}
              />
            </div>
          </div>
          
          <div>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <IconButton color="inherit">
              <Mail />
            </IconButton>
            <Avatar 
              alt="User Avatar" 
              src="https://randomuser.me/api/portraits/women/68.jpg" 
              className="w-8 h-8 ml-2"
            />
          </div>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-64 p-4">
          <Typography variant="h6" className="font-bold mb-6">
            Plog
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Bookmark />
              </ListItemIcon>
              <ListItemText primary="Saved" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="lg" className="py-8">
        {/* Create Post Button */}
        <div className="fixed bottom-8 right-8 z-10">
          <Fab color="primary" aria-label="add">
            <Add />
          </Fab>
        </div>

        {/* Posts Grid */}
        <Grid container spacing={4}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {/* Post Header */}
                <div className="flex items-center p-3">
                  <Avatar alt={post.username} src={post.avatar} />
                  <div className="ml-3">
                    <Typography variant="subtitle2" className="font-semibold">
                      {post.username}
                    </Typography>
                    {/* <Typography variant="caption" color="textSecondary">
                      {post.location}
                    </Typography> */}
                  </div>
                  {/* <IconButton className="ml-auto">
                    <MoreVert />
                  </IconButton> */}
                </div>

                {/* Post Image */}
                <CardMedia
                  component="img"
                  height="300"
                  image={post.image}
                  alt={post.caption}
                  className="object-cover"
                />

                {/* Post Caption and Tags */}
                <CardContent className="pt-0">
                  <Typography variant="body2" className="mb-2">
                    <span className="font-semibold">{post.username}</span> {post.caption}
                  </Typography>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={`#${tag}`}
                        size="small"
                        className="mr-1 mb-1"
                        onClick={() => setSearchQuery(tag)}
                      />
                    ))}
                  </div>
                  <Typography variant="caption" color="textSecondary" className="block mt-2">
                    {post.date}
                  </Typography>
                </CardContent>

                {/* Post Actions */}
                <CardActions className="flex justify-between px-4">
                  <div>
                    <IconButton aria-label="like" onClick={() => handleLike(post.id)}>
                      <Favorite className="text-red-500" />
                    </IconButton>
                    {/* <IconButton aria-label="share">
                      <Share />
                    </IconButton> */}
                  <Typography variant="body2" color="textSecondary">
                    {post.likes} likes
                  </Typography>
                  </div>
                </CardActions>


              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredPosts.length === 0 && (
          <Box className="text-center py-12">
            <Typography variant="h6" className="text-gray-500">
              No posts found matching your search
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
}
