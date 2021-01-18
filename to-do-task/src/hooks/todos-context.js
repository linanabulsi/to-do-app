import React from "react";
import { useQuery } from "react-query";
// import { TodoContext } from "../App";

export const TodoContext = React.createContext();

export function TodoProvider({ children }) {
  const { data, status, error, isFetching, refetch } = useQuery("todos", () =>
    fetch("http://localhost:5000/todos").then((res) => res.json())
  );

  return (
    <TodoContext.Provider value={{ data, status, error }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}
