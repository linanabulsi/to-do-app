import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import BarChart from "./components/charts/BarChart";
import { PieChart } from "./components/charts/PieChart";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Home />}>
              {/* <Home /> */}
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
    </QueryClientProvider>
  );
}

export default App;
