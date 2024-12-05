import './Logo.scss';
import logo from '../../../public/images/rick-and-morty-logo-250x76.png';

function Logo() {
  return (
    <div className="logo">
      <img src={logo} />
    </div>
  );
}

export default Logo;
