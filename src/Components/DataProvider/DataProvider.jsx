import { createContext, useReducer } from "react";


// DataProvider.js
export const Type = {
    SET_USER: "SET_USER",
    // Add other action types if needed
  };

export const DataContext = createContext()

export const DataProvider = ({children , reducer , initialState}) => {
    return(
        <DataContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </DataContext.Provider>
    )
} 
