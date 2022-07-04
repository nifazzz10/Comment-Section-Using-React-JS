import backendComments from "./comments/Comments"
import getData from "./comments/Comments"

export const getComments = async () => { try{
  const response = await fetch('https://backcomments.s3.amazonaws.com/comments.json');
  console.log('response  ', response)
  return  [
    {
      id: response.data.id,
      username:response.data.username,
      userId:response.data.userId,
      body:response.data.body,
      parentId:response.data.parentId,
      createdAt:response.data.createdAt,
    },

  ];;
}catch(error) {
  return [];
}

};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text ,
    parentId,
    userId: "1",
    username: "nifaz",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
