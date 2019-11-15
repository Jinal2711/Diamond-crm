import React from 'react';
import Header from './components/header';
import Shapes from './components/shapes';
import Cuts from "./components/cuts";

import EditShapes from './components/editShapes';
import EditCuts from './components/editCuts';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Shapes}></Route>
            <Route path="/edit/:id" component={EditShapes}></Route>
            <Route path="/add" component={EditShapes}></Route>
            <Route path="/cut" component={Cuts}></Route>
            <Route path="/edit_cut/:id" component={EditCuts}></Route>
            <Route path="/add_cut" component={EditCuts}></Route>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
