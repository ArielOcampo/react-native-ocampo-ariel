import axios from 'axios'
import apiUrl from '../../consts/url'

const userActions = {

  signUpUsers: (userData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(apiUrl + `api/signUp`, { userData })

        dispatch({
          type: 'message',
          payload: {
            view: true,
            message: res.data.message,
            success: res.data.success,


          }

        })

        return res
      } catch (error) {
        console.log(error);
      }
    }
  },

  loginUsers: (logedUser) => {

    return async (dispatch, getState) => {
      try {
        const res = await axios.post(apiUrl + `api/login`, { logedUser })

        if (res.data.success) {
          localStorage.setItem('token', res.data.response.token)
          dispatch({
            type: 'user',
            payload: { user: res.data.response.userData, success: res.data.success }
          })

        }

        return res
      } catch (error) {
        console.log(error);
      }

    }
  },

  signOut: () => {
    return (dispatch, getState) => {
      dispatch({
        type: "SIGN_OUT",
        payload: { message: "Thanks for your visit" }
      });
    };
  },

  verifyToken: (token) => {
    return async (dispatch, getState) => {
      try {
        const user = await axios.get(apiUrl + `api/logintoken`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })


        if (user.data.success) {
          dispatch({ type: 'user', payload: { user: user.data.response, success: user.data.success } });
          dispatch({
            type: 'MESSAGE_USER',
            payload: { view: true, message: user.data.message, success: user.data.success }
          })

        }
        else { localStorage.removeItem('item') }

        return user


      } catch (err) {
        console.error(err);
      }
    }
  },


}

export default userActions