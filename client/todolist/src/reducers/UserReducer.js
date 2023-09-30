export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SETUSER":
     let token=action.payload?.token?action.payload?.token    :localStorage.getItem("token") 
     let image=action.payload?.avatar? action.payload?.avatar :"" 
    
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
        avatar:image,
        token: token,
      };

        case "SETUSERAVATAR":
          return{
            ...state,
            avatar:action.payload
          }
    default:
      return {
        ...state,
      };
  }
};
