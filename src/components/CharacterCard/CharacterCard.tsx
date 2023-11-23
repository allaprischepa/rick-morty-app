import { useSelectorCustom } from '../../state/store';
import { CharacterData } from '../../types/types';
import './CharacterCard.scss';

export const TEST_ID = 'character-card';

function CharacterCard({
  name,
  status,
  species,
  location,
  image,
}: CharacterData) {
  const viewMode = useSelectorCustom('viewMode');

  return (
    <div
      className={`character-card view-mode_${viewMode}`}
      data-testid={TEST_ID}
    >
      <div className="character-image">
        <img src={image} />
      </div>
      <div className="character-description">
        <div className="character-name">{name}</div>
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
