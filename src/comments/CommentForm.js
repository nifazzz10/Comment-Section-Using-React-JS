import * as React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { Button, Stack} from "@mui/material";
import "../index.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css'; 
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

// import EditorToolbar, { modules, formats } from "./quill";
const CommentForm = ({
  handleSubmit,submitLabel,hasCancelButton = false, handleCancel,initialText = "",
}) => {


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
      {/* <EditorToolbar  /> */}
      <SunEditor
        // setContents="My contents"
        showToolbar={true}
  
       onChange={setText}      
        defaultValue={text} 
        setDefaultStyle="height: auto"
        setOptions={{
          showPathLabel: false,
          buttonList: [
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "list",
              "align",
              "fontSize",
              "formatBlock",
              "table",
              "image","fontColor", "hiliteColor"
            ]
          ]
       
        }}
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
