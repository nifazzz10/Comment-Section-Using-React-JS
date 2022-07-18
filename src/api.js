

export const getComments = async () => { try{
  const response = await fetch('https://backcomments.s3.amazonaws.com/comments.json');
  console.log('response  ', response)
  return  [
    {
      id: 1,
      username:"nfeg",
      userId:1,
      body:"whame",
      parentId:null,
   createdAt:    new Date().toISOString()
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
