import { Component } from 'react';
import './Logo.scss';
import logo from '../../../public/images/rick-and-morty-logo-250x76.png';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={logo}></img>
      </div>
    );
  }
}

export default Logo;
