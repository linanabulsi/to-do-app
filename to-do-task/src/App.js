import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <div className="App">
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
