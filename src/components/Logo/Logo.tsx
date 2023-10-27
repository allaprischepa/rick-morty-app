import { Component } from 'react';
import './Logo.scss';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src="../../public/images/rick-and-morty-logo.png"></img>
      </div>
    );
  }
}

export default Logo;
