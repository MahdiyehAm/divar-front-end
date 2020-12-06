
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import Widget from './Containers/widget/widget'

function App() {

  return (
    <Router>
      <div className="App" >
        <Switch>
          <Route path='/' exact>
            <Redirect to="/widgets" />
          </Route>
          <Route path='/widgets' exact component={Widget} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
