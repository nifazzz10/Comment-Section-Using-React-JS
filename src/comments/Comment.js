import CommentForm from "./CommentForm";
import Chip from '@mui/material/Chip';
import Timeline from "@mui/lab/Timeline";
import ReplyIcon from '@mui/icons-material/Reply';
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineContent from "@mui/lab/TimelineContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { makeStyles} from "@material-ui/core/styles";
import { Box } from "@mui/system";
import React from "react";
import { red } from "@mui/material/colors";
import "../index.css";
import  { useEffect, useState } from "react"
function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name) {
  return {
    sx: {fontSize:"15px",
      bgcolor: stringToColor(name),width:"32px",height:"32px"
    },
    children: `${name.toUpperCase().charAt(0)}`,
  };
}
const useStyles = makeStyles({
  "@global": {
    ".MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
      backgroundColor: "white"
    },
    ".MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label": {
      backgroundColor: "red"
    }
  }
});
const styles = () => ({
  selected: {
    "&:focus": {
      backgroundColor: "aliceblue"
    }
  }
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Comment({ comment, replies, setActiveComment, activeComment,addComment,parentId = null,currentUserId,}){

    // const [users, setUsers] = useState([])
  
    // const fetchData = () => {
    //   fetch("https://jsonplaceholder.typicode.com/users")
    //     .then(response => {
    //       return response.json()
    //     })
    //     .then(data => {
    //       setUsers(data)
    //     })
    // }
  
    // useEffect(() => {
    //   fetchData()
    // }, [])
  
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";
  const canReply = Boolean(currentUserId);
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleTimeString();
  const classes = useStyles();
 return(
  <div>
      <Box>
        <TreeView  >
          <Timeline key={comment.id}>
            <TimelineItem>
              <TimelineSeparator>
                <Avatar  {...stringAvatar(comment.username) }  />{" "}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineOppositeContent style={{maxWidth: "1px",paddingLeft: "0px",paddingRight: "0px", }}/>
              <TimelineContent>
                <Stack direction="row" spacing={1}>
                  <Typography variant="h6" sx={{fontSize:"15px" ,fontWeight:"bold"}}>
                    {comment.username.charAt(0).toUpperCase() + comment.username.slice(1)}
                  </Typography>
                  <Item variant="body2" sx={{fontSize:"10px"}}> {createdAt}</Item>
                </Stack>
                 <Typography variant="body2" >{comment.body}</Typography>
                <TreeItem className={classes}
                  nodeId="1" label={
                  <TimelineContent>
                   {canReply && (<Chip label="Reply"  onClick={() =>  setActiveComment({  id: comment.id,  type: "replying",  }) } 
                   sx={{fontSize:"10px",mb:1}} size="small" icon={<ReplyIcon /> }/>  )}
                        {isReplying && ( 
                        <CommentForm submitLabel="Reply" hasCancelButton handleSubmit={(text) => addComment(text, replyId)} handleCancel={() => { setActiveComment(null);}} />)} 
                    </TimelineContent> } >
                  <TreeItem className={styles}
                    nodeId="2"
                    label={
                      <Timeline>
                        {replies.length > 0 && (
                          <div>
                            {replies.map((reply) => (
                              <Comment
                                comment={reply}
                                key={reply.id}
                                setActiveComment={setActiveComment}
                                activeComment={activeComment}
                                addComment={addComment}
                                parentId={comment.id}
                                replies={[]}
                                currentUserId={currentUserId}
                              />
                            ))}
                          </div>
                        )}
                      </Timeline>}/>
                </TreeItem>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </TreeView>
      </Box>
    </div>
  );}; 

      