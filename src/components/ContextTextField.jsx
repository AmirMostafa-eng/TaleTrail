
import React from 'react';
import { TextField } from '@mui/material';

const ContentTextField = ({ content, setContent }) => {
  const maxLength = 200;
  
  return (
    <TextField
      fullWidth
      label="Post Content"
      variant="outlined"
      multiline
      rows={3}
      value={content}
      onChange={(e) => {
        if (e.target.value.length <= maxLength) {
          setContent(e.target.value);
        }
      }}
      helperText={`${content.length}/${maxLength} characters`}
      inputProps={{
        maxLength: maxLength
      }}
      sx={{ 
        marginBottom: '20px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.paper',
        }
      }}
    />
  );
};

export default ContentTextField;