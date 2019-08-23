import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";
import AddNewColor from "./components/AddColor";

function App() {
  return (
    <Router>
      <div className="App">
        <div className='linkholder'>
          <Link to='/'className='links'>Login</Link>
          <Link to='/bubblepage' className='links'>BubblePage</Link>
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
        <PrivateRoute exact path="/add-color" component={AddNewColor} />

      </div>
    </Router>
  );
}

export default App;
