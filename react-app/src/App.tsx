import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Calculator from "./Calculator"
import Chat from "./Chat"

export default function App() {

  return (
    <Router>
      <div>
        <nav>
            <Link to="/calculator">Calculator</Link>
                  <span style={{ padding: '50px' }}>&nbsp;</span>
            <Link to="/chat">Chat</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/calculator">
            <Calculator />
            </Route>      
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
