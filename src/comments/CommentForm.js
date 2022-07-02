import * as React from "react";
import { Box } from "@mui/system";
import { useState } from "react";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, TextField } from "@mui/material";
import { TextareaAutosize } from "@material-ui/core";
import TreeView from 'devextreme-react/tree-view';
const blue = {
  100: "#DAECFF",200: "#80BFFF",400: "#3399FF",  600: "#0072E5",
};
const grey = {
  50: "#F3F6F9", 100: "#E7EBF0",200: "#E0E3E7",300: "#CDD2D7", 400: "#B2BAC2",500: "#A0AAB4", 600: "#6F7E8C", 700: "#3E5060",800: "#2D3843",900: "#1A2027",
};
const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 320px;font-size: 0.875rem;font-family: IBM Plex Sans, sans-serif;font-weight: 400;line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 8px;padding: 12px 12px;
  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }
`
);
const StyledTextareaElement = styled("textarea", {
  shouldForwardProp: (prop) =>
    !["ownerState", "minRows", "maxRows"].includes(prop.toString()),
})(
  ({ theme }) => `
  width: 320px;font-size: 0.875rem;font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 8px;padding: 12px 12px;
  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }
`
);
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
  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled
        components={{
          Input: StyledInputElement,
          Textarea: StyledTextareaElement,
        }}
        {...props}
        ref={ref}
      />
    );
  });
  return (
      <Box>
        
      <form onSubmit={onSubmit}>
     
      <TextareaAutosize  
         style = {{width: "99.5%",borderRadius:"8px",backgroundColor:"#edf2f4"}}
          placeholder="Type your comment here..."
    
          rows={4}
          // defaultValue="Type your comment here..."
          value={text} onChange={(e) => setText(e.target.value)} />
          <Stack  direction="row" spacing={1}>
        <Button type="submit" variant="contained"  endIcon={<SendIcon />} disabled={isTextareaDisabled}> {submitLabel} </Button>
        {hasCancelButton && (
          <Button   variant="contained"   onClick={handleCancel} >Cancel</Button>
        )}</Stack></form>
      </Box>
   
  );
};

export default CommentForm;
