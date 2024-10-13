import axios from 'axios';

export default {
  /**
   * Загрузка комментариев
   * @param parentId - ID товара или комментария
   * @return {Function}
   */
  load: parentId => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'reviews/load-start' });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${parentId}`,
        });

        console.log('Загруженные комментарии:', res.data.result.items);
        dispatch({ type: 'reviews/load-success', payload: { data: res.data.result.items } });
      } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        dispatch({ type: 'reviews/load-error' });
      }
    };
  },

  addNewComment: (targetId, text, targetType, currentUser, id) => {
    const token = localStorage.getItem('token');
    return async dispatch => {
      dispatch({ type: 'reviews/add-start' });

      try {
        const res = await axios.post(
          '/api/v1/comments',
          {
            text: text,
            parent: { _id: targetId, _type: targetType },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Token': token,
            },
          },
        );
        const newComment = res.data.result;
        if (currentUser) {
          newComment.author = {
            _id: id,
            profile: {
              name: currentUser,
            },
          };
        }

        if (!newComment.dateCreate) {
          newComment.dateCreate = new Date().toISOString();
        }
        dispatch({ type: 'reviews/add-success', payload: newComment });
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        dispatch({ type: 'reviews/add-error' });
      }
    };
  },

  /**
   * Установка ID комментария, на который происходит ответ
   * @param commentId - ID комментария для ответа
   * @return {Function}
   */
  setReplyTo: commentId => {
    return dispatch => {
      dispatch({ type: 'reviews/set-reply-to', payload: commentId });
    };
  },

  /**
   * Сброс состояния ответа на комментарий
   * @return {Function}
   */
  clearReplyTo: () => {
    return dispatch => {
      dispatch({ type: 'reviews/clear-reply-to' });
    };
  },
};
