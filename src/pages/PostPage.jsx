import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import PostCard from '../components/PostCard';



export default function PostsPage(props) {
  
  const {posts , users , loggedInUserId} = props;

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

