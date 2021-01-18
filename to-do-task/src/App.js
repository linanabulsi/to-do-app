import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import BarChart from "./components/charts/BarChart";
import { PieChart } from "./components/charts/PieChart";
import { useQuery } from "react-query";

export const TodoContext = React.createContext();

function App() {
  const { data, status, error, isFetching, refetch } = useQuery("todos", () =>
    fetch("http://localhost:5000/todos").then((res) => res.json())
  );

  return (
    <TodoContext.Provider value={[data, status, error]}>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/barchart">
              <BarChart />
            </Route>
            <Route exact path="/piechart">
              <PieChart />
            </Route>
          </Switch>
        </Layout>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
