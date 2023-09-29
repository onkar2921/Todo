export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SETUSER":
     let token=action.payload?.token?action.payload?.token    :localStorage.getItem("token")  
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
        
        token: token,
      };

    default:
      return {
        ...state,
      };
  }
};
