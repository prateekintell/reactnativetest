import * as Action from './actions';

const initialState = {
  userData: null,
  cats: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.addCat:
      console.log("state ", state, "action  ", action)
      return {...state, cats: [...state.cats, action.payload]};

    case Action.removeCat:

      console.log("Action.removeCat ", state, "action  ", action)

      return {
        ...state,
        cats: state.cats.filter(cats => cats.id !== action.payload.id),
      };

    case Action.updatCat:
      console.log("action.payload ", action.payload)
    const index = state.cats.findIndex(obj => obj.id == action.payload.id);
      console.log("index ", index)
      const newArray = [...state.cats]; //making a new array
      newArray[index] = action.payload//changing value in the new array

     
      return {
        ...state,
        cats:newArray,
      };

    default:
      return state;
  }
};

export default reducer;
