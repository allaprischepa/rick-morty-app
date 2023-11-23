import { ChangeEvent } from 'react';
import { API_ITEMS_PER_PAGE } from '../../services/api/settings';
import styles from './ItemsPerPage.module.scss';
import { useSelectorCustom } from '../../state/store';
import { useDispatch } from 'react-redux';
import { updateItemsPerPage } from '../../state/itemsPerPage/itemsPerPageSlice';
import { useRouter } from 'next/router';

interface Props {
  optionsCount?: number;
}

function ItemsPerPage({ optionsCount = 3 }: Props) {
  const itemsPerPage = useSelectorCustom('itemsPerPage');
  const dispatch = useDispatch();
  const router = useRouter();

  const options: JSX.Element[] = [];

  for (let i = 1; i <= optionsCount; i++) {
    const value = API_ITEMS_PER_PAGE * i;
    options.push(
      <option key={i} value={value}>
        {value}
      </option>
    );
  }

  const handleChangeEvent = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;
    dispatch(updateItemsPerPage(value));

    if (itemsPerPage !== value) router.replace('/page/1');
  };

  return (
    <div className={styles.items_per_page}>
      <div className={styles.label}>Items per page</div>
      <div className={styles.select}>
        <select value={itemsPerPage} onChange={handleChangeEvent}>
          {options}
        </select>
      </div>
    </div>
  );
}

export default ItemsPerPage;
