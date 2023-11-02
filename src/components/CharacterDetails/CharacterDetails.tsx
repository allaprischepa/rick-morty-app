import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataLoader from '../../services/dataLoader/dataLoader';
import { ICharacterData } from '../../types/types';
import Loader from '../Loader/Loader';
import notFoundImage from '../../assets/images/empty-avatar.jpeg';
import './CharacterDetails.scss';

type CharacterData = ICharacterData | null;

function CharacterDetails() {
  const { characterID } = useParams();
  const [characterData, setCharacterData] = useState<CharacterData>(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dataLoader = new DataLoader();

    const loadData = async (id: string) => {
      try {
        const data = await dataLoader.getCharacterData(id);

        setTimeout(() => {
          setCharacterData(data);
          setLoader(false);
        }, 250);
      } catch (err) {
        console.error(err);
        setLoader(false);
      }
    };

    setLoader(true);
    loadData(characterID || '');
  }, [characterID]);

  const closeDetails = () => {
    navigate('..');
  };

  return (
    <>
      {loader ? <Loader /> : null}
      {characterData !== null ? (
        <div className="character-details-container">
          <div className="overlay" onClick={closeDetails}></div>
          <div className="character-details">
            {characterData ? (
              <>
                <div className="character-image">
                  <img src={characterData.image} />
                </div>
                <div className="character-description">
                  <table className="character-properties">
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td>{characterData.name}</td>
                      </tr>
                      <tr>
                        <td>Status:</td>
                        <td>{characterData.status || 'not specified'}</td>
                      </tr>
                      <tr>
                        <td>Species:</td>
                        <td>{characterData.species || 'not specified'}</td>
                      </tr>
                      <tr>
                        <td>Type:</td>
                        <td>{characterData.type || 'not specified'}</td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td>{characterData.gender || 'not specified'}</td>
                      </tr>
                      <tr>
                        <td>Origin:</td>
                        <td>{characterData.origin.name || 'not specified'}</td>
                      </tr>
                      <tr>
                        <td>Location:</td>
                        <td>
                          {characterData.location.name || 'not specified'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="character-image">
                  <img src={notFoundImage} />
                </div>
                <div className="character-description">
                  The character is not found...
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CharacterDetails;
