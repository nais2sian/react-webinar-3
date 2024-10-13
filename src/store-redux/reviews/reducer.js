import { produce } from 'immer';

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
      return { ...state};

    case 'reviews/add-success':
      return produce(state, draft => {
        draft.data.push(action.payload);
        draft.data.sort(
          (a, b) => new Date(a.dateCreate) - new Date(b.dateCreate)
        );
      });

    case 'reviews/add-error':
      return { ...state};

    default:
      return state;
  }
}
export default reducer;
