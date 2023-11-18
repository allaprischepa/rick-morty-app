import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import notFoundImage from '../../assets/images/empty-avatar.jpeg';
import './CharacterDetails.scss';
import { useGetCharacterDataQuery } from '../../services/api/rickMortyApi';
import { useDispatch } from 'react-redux';
import {
  turnOff,
  turnOn,
} from '../../state/loadingDetails/loadingDetailsSlice';
import { useSelectorCustom } from '../../state/store';
import { useEffect } from 'react';

export const TEST_ID = 'character-details';
export const CLOSE_BTN_TEST_ID = 'close-btn';

function CharacterDetails() {
  const { characterID: id = '' } = useParams();
  const NOT_SPECIFIED = 'not specified';
  const loadingDetails = useSelectorCustom('loadingDetails');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isFetching } = useGetCharacterDataQuery(id);

  const closeDetails = () => navigate('..');

  useEffect(() => {
    isFetching && !loadingDetails
      ? dispatch(turnOn())
      : setTimeout(() => dispatch(turnOff()), 250);
  }, [isFetching, loadingDetails, dispatch]);

  if (loadingDetails) return <Loader />;

  return (
    <div className="character-details-container" data-testid={TEST_ID}>
      <div className="overlay" onClick={closeDetails}></div>
      <div className="details-container">
        <button
          className="close-button"
          onClick={closeDetails}
          data-testid={CLOSE_BTN_TEST_ID}
        />
        <div className="character-details">
          {data ? (
            <>
              <div className="character-name">{data.name}</div>
              <div className="character-image">
                <img src={data.image} />
              </div>
              <div className="character-description">
                <table className="character-properties">
                  <tbody>
                    <tr>
                      <td>Status:</td>
                      <td>{data.status || NOT_SPECIFIED}</td>
                    </tr>
                    <tr>
                      <td>Species:</td>
                      <td>{data.species || NOT_SPECIFIED}</td>
                    </tr>
                    <tr>
                      <td>Type:</td>
                      <td>{data.type || NOT_SPECIFIED}</td>
                    </tr>
                    <tr>
                      <td>Gender:</td>
                      <td>{data.gender || NOT_SPECIFIED}</td>
                    </tr>
                    <tr>
                      <td>Origin:</td>
                      <td>{data.origin.name || NOT_SPECIFIED}</td>
                    </tr>
                    <tr>
                      <td>Location:</td>
                      <td>{data.location.name || NOT_SPECIFIED}</td>
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
  );
}

export default CharacterDetails;
