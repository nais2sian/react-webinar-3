export const initialState = {
  data: [],
  waiting: false,
  replyTo: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'reviews/load-start':
      return { ...state, data: [], waiting: true };

    case 'reviews/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'reviews/load-error':
      return { ...state, data: [], waiting: false };

    case 'reviews/set-reply-to':
      return { ...state, replyTo: action.payload };

    case 'reviews/clear-reply-to':
      return { ...state, replyTo: null };

    case 'reviews/add-start':
      return { ...state, waiting: true };

    case 'reviews/add-success': {
      const newComment = action.payload;
      return {
        ...state,
        data: [...state.data, newComment],
        waiting: false,
      };
    }

    case 'reviews/add-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}
export default reducer;
