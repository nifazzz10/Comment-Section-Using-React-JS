import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import {getComments as getCommentsApi, createComment as createCommentApi} from "../api";
import { EditorState} from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import { markdownToDraft } from 'markdown-draft-js';
import ReactMarkdown from "react-markdown";

const Comments = ({ commentsUrl, currentUserId }) => {

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
   backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };
console.log(backendComments);
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments((data));
    });
  }, []);
 
  fetch('https://backcomments.s3.amazonaws.com/comments.json')
  .then(result => result.json())
  .then((output) => {
      console.log('Output: ', output);
      
}).catch(err => console.error(err));

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' ,  accessKeyId: 's',
secretAccessKey: 'n'});
var s3 = new AWS.S3();
var buf = Buffer.from(JSON.stringify(backendComments));
  var datas = {
    Bucket: 'backcomments',
    Key: 'comments.json',
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'application/json; charset=utf-8',
    ACL: 'public-read'
};

s3.putObject(datas, function (err, datas) {
    if (err) {
        console.log(err);
        console.log('Error uploading data: ');
    } else {
        console.log('succesfully uploaded!!!');
    }
});

// const [getData, setData] = useState([])
  
// useEffect(() => {
//   fetch("https://backcomments.s3.amazonaws.com/comments.json")
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       // store Data in State Data Variable
//       setData(data);
//     })
//     .catch(function (err) {
//       console.log(err, " error");
//     });

//   //   const data = json_data;
//   // Fetch Function
// }, []);

// console.log(getData)

  return (
    <div >
     <Box>
    
     <Grid container spacing={1}><Grid item xs>
      <Typography variant="h6" sx={{fontWeight:"bold"}} gutterBottom component="div">
       Comment Section
      </Typography>
      <CommentForm submitLabel="Post"  handleSubmit={addComment} />
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            currentUserId={currentUserId}
          />
        ))}
     </Grid>   
        </Grid>
        </Box>
    </div>
  );
};

export default Comments;
