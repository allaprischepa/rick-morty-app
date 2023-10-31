import { ICharacterData } from '../../types/types';
import './CharacterCard.scss';

function CharacterCard({
  name,
  status,
  species,
  location,
  image,
}: ICharacterData) {
  return (
    <div className="character-card">
      <div className="character-image">
        <img src={image} />
      </div>
      <div className="character-name">{name}</div>
      <div className="character-description">
        <table className="character-properties">
          <tbody>
            <tr>
              <td>Status:</td>
              <td>{status}</td>
            </tr>
            <tr>
              <td>Species:</td>
              <td>{species}</td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>{location.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CharacterCard;
