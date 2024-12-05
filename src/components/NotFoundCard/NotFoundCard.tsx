import { Component } from 'react';
import image from '../../assets/images/empty-avatar.jpeg';
import '../CharacterCard/CharacterCard.scss';
import './NotFoundCard.scss';

class NotFoundCard extends Component {
  render() {
    return (
      <div className="character-card not-found-card">
        <div className="character-image">
          <img src={image}></img>
          <span className="not-found-stamp">Not found</span>
        </div>
        <div className="character-name">unknown</div>
        <div className="not-found-description">
          There is no such character...
        </div>
      </div>
    );
  }
}

export default NotFoundCard;
