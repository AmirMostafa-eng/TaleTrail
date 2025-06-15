import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

const ImageUploader = ({ featuredImage, setFeaturedImage, setEmptyImage }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (imageUrl.trim()) {
      setFeaturedImage(imageUrl);
      setImageUrl("");
      setEmptyImage();
    }
  };

  const handleFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFeaturedImage(base64String);
      setEmptyImage();
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileToBase64(file);
    }
  };

  // (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFeaturedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-base-content">
        Featured Image
      </label>

      <div className="w-full h-64 bg-base-200 rounded-lg overflow-hidden flex items-center justify-center">
        {featuredImage ? (
          <div className="relative w-full h-full group">
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full h-full object-cover"
              onError={() => setFeaturedImage(null)} // Handle broken images
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
          <div className="p-4 text-center">
            <CloudUpload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-500 mb-4">
              Enter image URL or upload from device
            </p>

            <Box component="div" className="flex gap-2">
              <TextField
                fullWidth
                size="small"
                label="Image URL"
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUrlSubmit(e);
                  }
                }}
              />
              <Button
                type="button" // Changed from type="submit"
                variant="contained"
                color="primary"
                disabled={!imageUrl.trim()}
                onClick={handleUrlSubmit}
              >
                Add
              </Button>
            </Box>

            <div className="mt-4">
              <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-base-200 hover:bg-base-300 transition p-4">
                <span className="text-sm text-gray-500">
                  Or upload from device
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
