export const TodoReducer = (state, action) => {
  switch (action.type) {
    case "SETTODOS":
      return {
        ...state,
        todos: action.payload,
      };

    case "SETSPECIFICTODO":
      return {
        ...state,
        specificCategoryTodo: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
