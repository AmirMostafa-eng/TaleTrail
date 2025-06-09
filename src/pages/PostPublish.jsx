import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel, Chip, Box } from '@mui/material';
import { CloudUpload, Add, Delete } from '@mui/icons-material';

const PostPublish = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [excerpt, setExcerpt] = useState('');

  const handleTagAdd = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      title,
      content,
      tags,
      isPublished,
      featuredImage,
      excerpt
    });
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-content">
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="opacity-80">Share your thoughts with the world</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <TextField
            fullWidth
            label="Post Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-base-200 rounded-lg"
            InputProps={{
              className: 'text-base-content'
            }}
            InputLabelProps={{
              className: 'text-base-content'
            }}
          />

          {/* Excerpt */}
          <TextField
            fullWidth
            label="Excerpt (Short Summary)"
            variant="outlined"
            multiline
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="bg-base-200 rounded-lg"
            InputProps={{
              className: 'text-base-content'
            }}
            InputLabelProps={{
              className: 'text-base-content'
            }}
          />

          {/* Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content">Post Content</label>
            <textarea
              className="w-full h-64 p-4 bg-base-200 rounded-lg text-base-content border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Featured Image */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-base-content">Featured Image</label>
            {featuredImage ? (
              <div className="relative group">
                <img 
                  src={featuredImage} 
                  alt="Featured" 
                  className="h-64 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFeaturedImage(null)}
                  className="absolute top-2 right-2 btn btn-error btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Delete />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary rounded-lg cursor-pointer bg-base-200 hover:bg-base-300 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUpload className="w-8 h-8 mb-3 text-primary" />
                  <p className="text-sm text-base-content">Click to upload or drag and drop</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                  className="bg-primary text-primary-content"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <TextField
                size="small"
                label="Add Tag"
                variant="outlined"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-grow bg-base-200 rounded-lg"
                InputProps={{
                  className: 'text-base-content'
                }}
                InputLabelProps={{
                  className: 'text-base-content'
                }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleTagAdd}
                className="btn btn-primary"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Publish Options */}
          <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
            <FormControlLabel
              control={
                <Switch
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  color="primary"
                />
              }
              label="Publish Immediately"
              className="text-base-content"
            />

            <div className="flex gap-4">
              <Button
                variant="outlined"
                color="secondary"
                className="btn btn-outline btn-secondary"
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="btn btn-primary"
              >
                {isPublished ? 'Publish Post' : 'Save as Draft'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostPublish;