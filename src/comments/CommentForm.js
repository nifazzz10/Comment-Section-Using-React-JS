import * as React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, TextField } from "@mui/material";
import { TextareaAutosize } from "@material-ui/core";
const CommentForm = ({
  handleSubmit,submitLabel,hasCancelButton = false, handleCancel,initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
      <Box>
      <form onSubmit={onSubmit}>   
      <TextareaAutosize  
         style = {{width: "99.5%",borderRadius:"8px",backgroundColor:"#edf2f4"}}
          placeholder="Type your comment here..."
          rows={4}
          value={text} onChange={(e) => setText(e.target.value)} />
          <Stack  direction="row" spacing={1}>
        <Button type="submit" variant="contained"  endIcon={<SendIcon />} disabled={isTextareaDisabled}> {submitLabel} </Button>
        {hasCancelButton && (
          <Button   variant="contained"   onClick={handleCancel} >Cancel</Button>
        )}</Stack>
        </form>
      </Box>
   
  );
};

export default CommentForm;
