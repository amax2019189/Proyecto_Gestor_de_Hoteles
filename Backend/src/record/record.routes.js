import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import record from './record';
import record from './record';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/historial">
            <Historial />
          </Route>
          <Route path="/">
            <Inicio />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
