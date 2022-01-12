import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style2.css"
import Table from 'react-bootstrap/Table'


import LoggedIn from './LoggedIn';
import LogIn from './Login';
import facade from './ApiFacade';

import { useState, state, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { URL } from './settings';

function LoginPrompt() {
  const [loggedIn, setLoggedIn] = useState(false)
  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }

  const login = (user, pass) => {
    facade.login(user, pass)
    .then(res => res.json())
    .then(res => setLoggedIn(true));
  }

  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn facade={facade} />
          <button onClick={logout}>Logout</button>
        </div>)}
    </div>
  )
}

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header/>
        <hr />
       
        {
          /*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
          */
        }
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/whatisthiseven">
            <Dashboard />
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.


function Header(){
  return(
    <div>
      <ul className="header">
          <li>
          <NavLink exact activeClassName="selected" to="/">Weather</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/whatisthiseven">Dashboard</NavLink>
          </li>
        </ul>
    </div>
  );
}



function Home() {
  return(
    <div>
      
    </div>
  );
}

function Login() {
  return (
    <form action="{URL}">
    <div class="form-group w-25">
      <LoginPrompt/>
    </div>
  </form>
  );
}



function OwnersComponent() {
  const [owners, setOwners] = useState([])
  
  useEffect(() => {
    fetch(URL + "api/owner/sho")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setOwners(data);
  });
  }, []);
  

  return (
    <>
    {owners.size > 0 ? (
    <>
    <div>
        <Table striped bordered hover>
          <thead>
          <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Address</td>
          <td>Phone</td>
          </tr>
            </thead>
            <tbody>
      {owners.map((x) => {
        return (
        <tr key={x.id}>
        <td>{x.id}</td>
        <td>{x.name}</td>
        <td>{x.address}</td>
        <td>{x.phone}</td>
        </tr>
        )
      })}
      </tbody>
      </Table>
      </div>
    </>
    )
     :
    (
    <h2>Failed fetching data</h2>
    )}
    </>
    );
 
}


function Dashboard() {
  return (
    OwnersComponent()
  );

    
}

