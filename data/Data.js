// We are generating dummy data for the comments belonging to the same task ID
// The data is sorted as per time, the oldest comment are at botton and the youngest comment is at top. 
const data = [
  {
    commentPath: "s3://comment1.txt",
    FilePathIndex: "s3://Order_Number//file1.txt", // the content of the comment shall be extracted
    taskId: "task_1",
    ParentCommentId: null,
  },
  {
    commentPath: "s3://comment2.txt",
    FilePathIndex: "s3://Order_Number//file1.txt",
    taskId: "task_1",
    ParentCommentId: "s3://comment1.txt", // this is a child of the previous comment i.e obj[0]
  },
  {
    commentPath: "s3://comment3.txt",
    FilePathIndex: "s3://Order_Number//file1.txt",
    taskId: "task_1",
    ParentCommentId: "s3://comment1.txt", // This is also a child of the comment obj[0]
  },
  {
    commentPath: "s3://comment4.txt", // This is a parent comment
    FilePathIndex: "s3://Order_Number//file1.txt",
    taskId: "task_1",
    ParentCommentId: null,
  },
  {
    commentPath: "s3://comment1.txt",// This is also a child of the comment obj[3]
    FilePathIndex: "s3://Order_Number//file1.txt",
    taskId: "task_1",
    ParentCommentId: "s3://comment4.txt",
  },
  {
    commentPath: "s3://comment1.txt",// This is also a child of the comment obj[3]
    FilePathIndex: "s3://Order_Number//file1.txt",
    taskId: "task_1",
    ParentCommentId: "s3://comment4.txt",
  },
];
export const Data = () => {
  return data;
};
export default data;
