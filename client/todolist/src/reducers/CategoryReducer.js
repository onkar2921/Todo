export const CategoryReducer = (state, action) => {
  switch (action.type) {
    case "SETCATEGORY":
      
      const Categories = action?.payload?.map((item) => {
        return {
          name: item?.name,
          id: item?._id,
        };
      });

     
      return {
        ...state,
        categories: Categories,
        allinfo: action?.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
