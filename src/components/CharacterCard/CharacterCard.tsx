import { Component } from 'react';
import { ICharacterData } from '../../types/types';
import './CharacterCard.scss';

class CharacterCard extends Component<ICharacterData> {
  render() {
    const { name, status, species, location, image } = this.props;

    return (
      <div className="character-card">
        <div className="character-image">
          <img src={image}></img>
        </div>
        <div className="character-name">{name}</div>
        <div className="character-description">
          <div className="character-status">Status: {status}</div>
          <div className="character-species">Species: {species}</div>
          <div className="character-location">Location: {location.name}</div>
        </div>
      </div>
    );
  }
}

export default CharacterCard;
