import * as React from "react";
import { Box } from "@mui/system";
import { useState,setState } from "react";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, TextField } from "@mui/material";
import { TextareaAutosize } from "@material-ui/core";
import "../index.css"
import { Editor } from 'react-draft-wysiwyg';
import MUIRichTextEditor from 'mui-rte'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";import { convertFromHTML } from "draft-js";import { ContentState } from "draft-js";
import { convertToRaw } from 'draft-js'
import { EditorState} from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
// import RichTextEditor from "./quill";
import EditorToolbar, { modules, formats } from "./quill";
const CommentForm = ({
  handleSubmit,submitLabel,hasCancelButton = false, handleCancel,initialText = "",
}) => {

  const emptyContent = JSON.stringify(
    convertToRaw(EditorState.createEmpty().getCurrentContent())
  );
  const [text, setText] = useState("");
  const [content, setContent] = useState(emptyContent);

  const handleChange = editorState => {
    setText(draftToMarkdown(convertToRaw(editorState.getCurrentContent())))
  };

  

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  
const myTheme = createTheme({
  // Set up your custom MUI theme here
  overrides: {
   
    MUIRichTextEditor: {
      root: {
        marginTop: 2,
        width: "100%",
        marginBottom: 20,
        backgroundColor: "#edf2f4",
        
         
      
      },
      editor: {
        border: "1px solid white",
        height:"80px",
      }
    }
  }
})

  const [value, setValue] = useState('');



  return (
    <div>  

        {/* <!-- contact form --> */}

       

      <Box>
      <form onSubmit={onSubmit}>   
      {/* <ReactQuill theme="bubble" value={value} onChange={setValue}/> */}
      {/* <ThemeProvider theme={myTheme}> */}
    {/* <MUIRichTextEditor
      label="Type something here..."
      onChange={handleChange}
      defaultValue={content}
      inlineToolbar={true}
    /> */}
    {/* <ReactQuill theme="bubble"  onChange={setText}
      defaultValue={text}/> */}
          {/* <RichTextEditor placeholder="some fun text"   onChange={setText}
      defaultValue={text} /> */}
        <EditorToolbar /> <ReactQuill
        theme="bubble"
        onChange={setText}
        defaultValue={text} 
        readOnly={true}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
  {/* </ThemeProvider> */}
  {/* <TextareaAutosize  
         style = {{width: "99.5%",borderRadius:"8px",backgroundColor:"#edf2f4"}}
          placeholder="Type your comment here..."
          rows={4}
          value={text} onChange={(e) => setText(e.target.value)} /> */}
    
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
