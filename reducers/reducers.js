import { combineReducers } from "redux";

const users = (state = { byID: {}, allIDs: [] }, action) => {
  switch (action.type) {
    case "ADD_USER":
      return Object.assign(
        {},
        {
          byID: Object.assign({}, state.byID, { [action.user.id]: action.user })
        },
        {
          //must check if allIDs exists since ref has not been made yet
          //Only made once first value is inputted since it is
          //part of the Object.assign not the initial state = {}
          allIDs: [...state.allIDs, action.user.id]
        }
      );
    case "REMOVE_USER":
      let obj = Object.assign({}, state);
      delete obj[action.user.id];
      return Object.assign(
        {},
        { byID: obj },
        { allIDs: state.allIDs.filter(v => v !== action.user.id) }
      );
    case "UPDATE_USER":
      return Object.assign({}, state, {
        byID: Object.assign({}, state.byID, { [action.user.id]: action.user })
      });
    default:
      return state;
  }
};

const posts = (
  state = {
    byID: {
      1: {
        authorID: 1,
        authorName: "Jay",
        cost: 50.0,
        photo:
          "https://images.unsplash.com/photo-1563302111-eab4b145e6c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      }
    },
    allIDs: [1]
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const myPosts = (state = { byID: {}, allIDs: [] }, action) => {
  switch (action.type) {
    case "ADD_MYPOST":
      return state;
    case "REMOVE_MYPOST":
      return state;
    case "UPDATE_MYPOST":
      return state;
    default:
      return state;
  }
};
const CouponApp = combineReducers({
  users,
  posts
});
export default CouponApp;
