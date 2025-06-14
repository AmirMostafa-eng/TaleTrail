import { TextField } from "@mui/material";
import React from "react";

export default function TitleTextField({ title, setTitle }) {
  const maxLength = 50;
  return (
    <TextField
      name="title"
      fullWidth
      label="Post Title"
      variant="outlined"
      value={title}
      onChange={(e) => {
        if (e.target.value.length <= maxLength){
          setTitle(e.target.value)
        }
      }}
      helperText={`${title.length}/${maxLength} characters`}
      required
      sx={{ marginBottom: "20px" }}
    />
  );
}
