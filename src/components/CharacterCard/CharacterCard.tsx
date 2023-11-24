import styles from './CharacterCard.module.scss';

export const TEST_ID = 'character-card';

function CharacterCard({ viewMode, ...character }) {
  const { name, status, species, location, image } = character;

  return (
    <div
      className={`${styles.character_card} ${styles[`view_mode__${viewMode}`]}`}
      data-testid={TEST_ID}
    >
      <div className={styles.character_image}>
        <img src={image} />
      </div>
      <div className={styles.character_description}>
        <div className={styles.character_name}>{name}</div>
        <table className={styles.character_properties}>
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
