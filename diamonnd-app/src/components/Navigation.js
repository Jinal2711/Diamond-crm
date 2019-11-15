import React, { Component } from 'react';

export default class Navigation extends Component {

  render() {
    return (

      <nav className={`navbar navbar-expand-md fixed-top${this.props.scroll_top > 100 ? ' active' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link linkName" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link linkName" href="#">About us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link linkName" href="#">Contact us</a>
              </li>
            </ul>
          </div>
        </div>

      </nav>

    );
  }
}