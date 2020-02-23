//ACTION TYPES

//Global User Operations adding to USER DB
const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER = "UPDATE_USER";

//Private User Operations adding to posts DB
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const UPDATE_POST = "UPDATE_POST";

//ACTION CREATORS

export const addUser = user => {
  // console.log(user);
  return {
    type: ADD_USER,
    user
  };
};

export const removeUser = ({ userID }) => {
  return {
    type: DELETE_USER,
    id
  };
};

export const updateUser = user => {
  return {
    type: UPDATE_USER,
    id: user.id,
    user
  };
};

export const addPost = post => {
  return {
    type: ADD_POST,
    post
  };
};

export const removePost = ({ id }) => {
  return {
    type: REMOVE_POST,
    id
  };
};

export const updatePost = post => {
  return {
    type: UPDATE_POST,
    id: post.id,
    post
  };
};
