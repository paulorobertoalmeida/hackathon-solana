import React, { Component } from "react";
import logo from '../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
// import Button from 'react';

function walletConnected() {
  alert('You clicked me and Im connected!');
}

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="center">
          {/* LOGO */}
          <div id="logo">
            <img
              src={logo}
              className="app-logo"
              alt="Logotipo"
            />
            <span id="brand">
              <strong>Solagram</strong>
            </span>
          </div>

          {/* MENU */}
          <nav id="menu">
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active">Home</NavLink>
              </li>
              <li>
              <NavLink to="/feed" exact activeClassName="active">Feed</NavLink>
              </li>
              <li>
              <NavLink to="/create" exact activeClassName="active">Create</NavLink>
              </li>
              <li>
              <NavLink to="/peliculas" exact activeClassName="active">Highlight</NavLink>
              </li>
              <button className="btn-wallet" onClick={walletConnected}>Wallet Connect</button>
            </ul>
          </nav>
          {/*LIMPIAR FLOTADOS*/}
          <div className="clearfix"></div>
        </div>
      </header>
    );
  }
}

export default Header;
