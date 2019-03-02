import { AnyAction } from "typescript-fsa";
import React, { StatelessComponent, createContext } from "react";

export type ReduxDispatch = (action: AnyAction) => AnyAction

export interface DispatchProviderProps {
  reduxDispatch: ReduxDispatch
}

export const DispatchContext = createContext((action: AnyAction) => action)

export const DispatchProvider: StatelessComponent<DispatchProviderProps> = ({ reduxDispatch, children }) => (
  <DispatchContext.Provider value={reduxDispatch}>
    {children}
  </DispatchContext.Provider>
)
