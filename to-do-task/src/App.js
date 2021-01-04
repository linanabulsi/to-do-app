import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import ToDoContainer from "./components/to-do-container/ToDoContainer";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import AddTaskForm from "./components/add-task-form/AddTaskForm";

function App() {
  
  return (
    <div className="App">
      {/* <AddTaskForm /> */}
      <Layout>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
