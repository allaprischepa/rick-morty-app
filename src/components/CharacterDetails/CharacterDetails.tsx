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
  const NOT_SPECIFIED = 'not specified';

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
          <div className="details-container">
            <button className="close-button" onClick={closeDetails} />
            <div className="character-details">
              {characterData ? (
                <>
                  <div className="character-name">{characterData.name}</div>
                  <div className="character-image">
                    <img src={characterData.image} />
                  </div>
                  <div className="character-description">
                    <table className="character-properties">
                      <tbody>
                        <tr>
                          <td>Status:</td>
                          <td>{characterData.status || NOT_SPECIFIED}</td>
                        </tr>
                        <tr>
                          <td>Species:</td>
                          <td>{characterData.species || NOT_SPECIFIED}</td>
                        </tr>
                        <tr>
                          <td>Type:</td>
                          <td>{characterData.type || NOT_SPECIFIED}</td>
                        </tr>
                        <tr>
                          <td>Gender:</td>
                          <td>{characterData.gender || NOT_SPECIFIED}</td>
                        </tr>
                        <tr>
                          <td>Origin:</td>
                          <td>{characterData.origin.name || NOT_SPECIFIED}</td>
                        </tr>
                        <tr>
                          <td>Location:</td>
                          <td>
                            {characterData.location.name || NOT_SPECIFIED}
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
        </div>
      ) : null}
    </>
  );
}

export default CharacterDetails;
