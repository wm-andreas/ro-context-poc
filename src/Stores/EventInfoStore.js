import React, { createContext, useReducer } from "react";

// Defines actions for the reducer
const actionTypes = {
  basicInfo_set: "SET_BASICINFO",
  tickets_add: "ADD_TICKET",
  tickets_remove: "REMOVE_TICKET",
};

// Defines handlers for the reducer,
// this is to avoid lenghty switch statements and to keep code clean(ish).
const handlers = {
  [actionTypes.basicInfo_set]: (state, action) => {
    const { name, value } = action.payload;
    const { basicInfo } = state;
    basicInfo[name] = value;
    return { basicInfo };
  },

  [actionTypes.tickets_add]: (state, action) => ({
    tickets: [...state.tickets, action.payload],
  }),

  [actionTypes.tickets_remove]: (state, action) => {
    const tickets = [...state.tickets];
    tickets.splice(action.payload, 1);
    return { tickets };
  },
};

// Actual reducer
const EventInfoReducer = (state, action) => {
  const handler = handlers[action.type];

  // If no handler is found, throw an error
  if (!handler) {
    throw new Error(`Unknown action type: ${action.type}`);
  }
  const nextState = handler(state, action);

  // Merge old state with new state, this is to keep the action handlers clean from merging state
  return { ...state, ...nextState };
};

const initialState = {
  basicInfo: {
    name: "",
    email: "",
  },
  tickets: [],
};

// Used to wrap context to be able to re-use
const EventInfoStore = ({ children }) => {
  const [state, dispatch] = useReducer(EventInfoReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export { actionTypes };
export default EventInfoStore;
