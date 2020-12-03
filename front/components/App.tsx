import * as React from 'react';
import './App.scss';
import logo from './logo_webeleon.png';

export const App: React.FunctionComponent = () => (
  <div className="container">
    <img className="logo" src={logo} alt="Logo webeleon" />
    <h1 className="title">Nest JS + React = Love</h1>
    <h2 className="subtitle">
      <a href="#">By Webeleon</a>
    </h2>
  </div>
);
