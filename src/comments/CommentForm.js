import * as React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { Button, Stack} from "@mui/material";
import "../index.css"
import { convertToRaw } from 'draft-js'
import { EditorState} from "draft-js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css'; 

import EditorToolbar, { modules, formats } from "./quill";
const CommentForm = ({
  handleSubmit,submitLabel,hasCancelButton = false, handleCancel,initialText = "",
}) => {

  const emptyContent = JSON.stringify(
    convertToRaw(EditorState.createEmpty().getCurrentContent())
  );
  const [text, setText] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <div>
      <Box>
      <form onSubmit={onSubmit}>   
      <EditorToolbar  />
        <ReactQuill
        theme="bubble"
        onChange={setText}      
        defaultValue={text} 
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      /> 
          <Stack  direction="row" spacing={1}>
        <Button type="submit" variant="contained"     endIcon={<SendIcon />} > {submitLabel} </Button>
        {hasCancelButton && (
          <Button   variant="contained"   onClick={handleCancel} >Cancel</Button>
        )}</Stack>
        </form>
      </Box>
      </div>

  );

};
export default CommentForm;
