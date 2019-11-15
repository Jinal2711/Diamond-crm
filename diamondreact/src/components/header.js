import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Shapes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cut">Cuts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add_img">Add Images</Link>
              </li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}