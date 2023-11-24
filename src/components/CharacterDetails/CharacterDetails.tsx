import Loader from '../Loader/Loader';
import notFoundImage from '../../assets/images/empty-avatar.jpeg';
import styles from './CharacterDetails.module.scss';
import { useGetCharacterDataQuery } from '../../services/api/rickMortyApi';
import { useDispatch } from 'react-redux';
import {
  turnOff,
  turnOn,
} from '../../state/loadingDetails/loadingDetailsSlice';
import { useSelectorCustom } from '../../state/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { isString } from '../../utils/utils';

export const TEST_ID = 'character-details';
export const CLOSE_BTN_TEST_ID = 'close-btn';

function CharacterDetails() {
  const router = useRouter();
  const { characterID, pageID } = router.query;
  const id = isString(characterID) ? characterID : '';
  const NOT_SPECIFIED = 'not specified';
  const loadingDetails = useSelectorCustom('loadingDetails');
  const dispatch = useDispatch();

  const { data, isFetching } = useGetCharacterDataQuery(id);

  const closeDetails = () =>
    router.push(`/page/${pageID}`, undefined, { scroll: false, shallow: true });

  useEffect(() => {
    isFetching && !loadingDetails
      ? dispatch(turnOn())
      : setTimeout(() => dispatch(turnOff()), 250);
  }, [isFetching, loadingDetails, dispatch]);

  if (loadingDetails) return <Loader />;

  return (
    <div className={styles.character_details_container} data-testid={TEST_ID}>
      <div className={styles.overlay} onClick={closeDetails}></div>
      <div className={styles.details_container}>
        <button
          className={styles.close_button}
          onClick={closeDetails}
          data-testid={CLOSE_BTN_TEST_ID}
        />
        <div className={styles.character_details}>
          {data ? (
            <>
              <div className={styles.character_name}>{data.name}</div>
              <div className={styles.character_image}>
                <img src={data.image} />
              </div>
              <div className={styles.character_description}>
                <table className={styles.character_properties}>
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
              <div className={styles.character_image}>
                <Image src={notFoundImage} alt="Not found character" />
              </div>
              <div className={styles.character_description}>
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
