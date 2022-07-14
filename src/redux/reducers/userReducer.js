const initialState = {
  user: {

  },
  notification: {
    view: false,
    message: '',
    success: false
  },
  messageUser: null,

}

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'message':
      return {
        ...state,
        notification: action.payload,

      }
    case 'user':
      return {
        ...state,
        user: action.payload

      }
    case 'MESSAGE_USER':
      return {
        ...state,
        messageUser: action.payload
      }
    case 'SIGN_OUT':
      localStorage.removeItem("token");
      return {
        user: {
          token: null,
          success: null,
          firstName: null,
          userPhoto: null,
          _id: null,
        }
      };



    default:
      return state
  }
}
export default userReducer