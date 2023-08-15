import React, { createContext, useContext, useReducer } from 'react';

import { initialBacktrackMsgState, backtrackMsgReducer } from './reducer';

const ConvContext = createContext(null);
const ConvDispatchContext = createContext(null);

export function ConvProvider({ children }) {
  const [state, dispatch] = useReducer(
    backtrackMsgReducer,
    initialBacktrackMsgState
  );

  return (
    <ConvContext.Provider value={state}>
      <ConvDispatchContext.Provider value={dispatch}>
        {children}
      </ConvDispatchContext.Provider>
    </ConvContext.Provider>
  );
}

export function useConvState() {
  return useContext(ConvContext);
}

export function useConvDispatch() {
  return useContext(ConvDispatchContext);
}
