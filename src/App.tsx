import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { $CombinedState } from "redux";
import "./App.css";
import { useAppSelector } from "./hooks/redux";

function App() {

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </header>
        <main>
          <Routes>
            <Route path="/">
              <App />
            </Route>
            <Route path="/about">
              <App />
            </Route>
            <Route path="/dashboard">
              <App />
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
