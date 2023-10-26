import { Component } from 'react';
import { ICharacterData } from '../../types/types';
import './CharacterCard.scss';

class CharacterCard extends Component<ICharacterData> {
  render() {
    const { name, status, species, location, image } = this.props;

    return (
      <div className="character-card">
        <img src={image}></img>
        <div className="character-name">Name: {name}</div>
        <div className="character-status">Status: {status}</div>
        <div className="character-species">Species: {species}</div>
        <div className="character-location">Location: {location.name}</div>
      </div>
    );
  }
}

export default CharacterCard;
