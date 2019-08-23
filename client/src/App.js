import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <div className='linkholder'>
          <Link to='/'>Login</Link>
          <Link to='/bubblepage'>BubblePage</Link>
        </div>
        <Route
          exact
          path="/"
          render={props => {
            const token = localStorage.getItem("token");

            if (token) {
              return <Redirect to="/bubblepage" />;
            }
            return <Login {...props} />;
          }}
        />
        <PrivateRoute exact path="/bubblepage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
