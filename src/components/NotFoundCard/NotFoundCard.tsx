import Image from 'next/image';
import image from '../../assets/images/empty-avatar.jpeg';
import cardStyles from '../CharacterCard/CharacterCard.module.scss';
import styles from './NotFoundCard.module.scss';

function NotFoundCard() {
  return (
    <div className={`${cardStyles.character_card} ${styles.not_found_card}`}>
      <div className={cardStyles.character_image}>
        <Image src={image} alt="Not found character" />
        <span className={styles.not_found_stamp}>Not found</span>
      </div>
      <div className={cardStyles.character_name}>unknown</div>
      <div className={styles.not_found_description}>
        There is no such character...
      </div>
    </div>
  );
}

export default NotFoundCard;
