import { bindActionCreators } from "redux";

// Most of this is just adapted boilerplate reducer examples from https://redux.js.org/basics/reducers
export default (state = { cards: [] }, action) => {
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return {
        ...state,
        cards: action.data.cards
      };
    case "SUBMIT_CARD":
      return {
        cards: [
          ...state,
          {
            title: action.data.title,
            body: action.data.body,
            author: action.data.author
          }
        ]
      };
    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter(card => card._id !== action.id)
      };
    case "SET_EDIT":
      return {
        ...state,
        cardToEdit: action.card
      };
    case "EDIT_CARD":
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card._id === action.data.card._id) {
            return {
              ...action.data.card
            };
          }
          return card;
        }),
        cardToEdit: undefined
      };
    default:
      return state;
  }
};
