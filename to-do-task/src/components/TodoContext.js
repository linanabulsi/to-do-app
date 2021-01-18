import React from 'react'

const TodoContext = React.createContext();

const TodoProvider = TodoContext.Provider;
const TodoConsumer = TodoContext.Consumer;

export {TodoProvider, TodoConsumer}