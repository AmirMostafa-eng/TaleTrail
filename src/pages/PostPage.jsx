import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import PostCard from '../components/PostCard';



const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const loggedInUserId = 1; 

  

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, usersRes] = await Promise.all([
        axios.get('/posts'),
        axios.get('/users'),
      ]);
      setPosts(postsRes.data);
      setUsers(usersRes.data);
    };

    fetchData();
  }, []);

  const getUser = (id) => users.find((user) => user.id === id);

  return (
    <div style={{ padding: 20 }}>
      {posts.map((post) => {
        const user = getUser(post.publisherId);
        return user ? (
          <PostCard
            key={post.postId}
            post={post}
            user={user}
            isOwner={post.publisherId === loggedInUserId}
          />
        ) : null;
      })}
    </div>
  );
};

export default PostsPage;
