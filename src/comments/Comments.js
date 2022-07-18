import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
} from "../api";

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
      setBackendComments(data);
    });
  }, []);

  return (
    <div>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
              gutterBottom
              component="div"
            >
              Comment Section
            </Typography>
            <CommentForm submitLabel="Post" handleSubmit={addComment} />
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
