import axios from 'axios'
import apiUrl from '../../consts/url'

const commentsActions = {
  addComment: (comment) => {

    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {

      if (comment.comment !== "") {
        const res = await axios.post(`${apiUrl}api/comments`, { comment }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }

        })
        return res

      } else {
        dispatch({
          type: 'message',
          payload: {
            view: true,
            message: "Write a comment to save it",
            success: false
          }
        })
      }

    }

  },
  modifyComment: (comment) => {

    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      const res = await axios.put(`${apiUrl}api/comments`, { comment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch({
        type: 'message',
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success
        }
      })

      return res
    }
  },
  deleteComment: (id) => {

    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      const res = await axios.post(`${apiUrl}api/comments/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      })
      dispatch({
        type: 'message',
        payload: {
          view: true,
          message: res.data.message,
          success: res.data.success
        }
      })
      return res
    }
  },

}

export default commentsActions


