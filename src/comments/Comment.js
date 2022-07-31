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
import { Box } from "@mui/system";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  
  },
  label: {
    backgroundColor: "white",

  },
 
});
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Comment({ comment, replies, setActiveComment, activeComment,addComment,parentId = null,currentUserId,}){
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";
  const canReply = Boolean(currentUserId);
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleTimeString();
  const classes = useStyles();
  const StyledTreeItem = withStyles({
    label: {
      backgroundColor: "white",
   
    },
    root: {
      "&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
      backgroundColor: "white"
    },
    "&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label": {
      backgroundColor: "white"
    }
    }
  })(TreeItem);
 
 return(
  <>
      
      <Box>
        <TreeView   className={classes.root}  defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />} >
          <Timeline key={comment.id}>
            <TimelineItem>
              <TimelineSeparator  sx={{paddingTop:"8px"}} >
                <Avatar  {...stringAvatar(comment.username) }/>{" "}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineOppositeContent style={{maxWidth: "1px",padding:"0px"}}/>
              <TimelineContent>
                <Stack direction="row" spacing={0}>
                  <Typography  variant="span" >
                 
                  </Typography>
                  <Item variant="span" sx={{fontSize:"15px",fontWeight:"bold",color:"black"}}>    {comment.username.charAt(0).toUpperCase() + comment.username.slice(1)}</Item>
                  <Item variant="span" sx={{fontSize:"10px",paddingTop:"13px"}}> {createdAt}</Item>
                </Stack>
                <ReactMarkdown className="markdown" children={comment.body} rehypePlugins={[rehypeRaw]} />
                
             <StyledTreeItem 
             
                  nodeId="1"      label={
                  <TimelineContent>
                   {canReply && (<Chip label="Reply"  onClick={() =>  setActiveComment({  id: comment.id,  type: "replying",  }) } 
                   sx={{fontSize:"10px",mb:1,mt:1}} size="small" icon={<ReplyIcon /> }/>  )}
                        {isReplying && ( 
                        <CommentForm submitLabel="Reply" hasCancelButton handleSubmit={(text) => addComment(text, replyId)} handleCancel={() => { setActiveComment(null);}} />)} 
                    </TimelineContent> }>
                  <StyledTreeItem 
                    nodeId="2"       
                    label={
                      <Timeline>
                        {replies.length > 0 && (
                          <>
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
                          </>
                        )}
                      </Timeline>}/>
                    
    
                </StyledTreeItem>
              </TimelineContent>
              
            </TimelineItem>
            
          </Timeline>
        </TreeView>
      
      </Box>
    </>
  );}; 

      