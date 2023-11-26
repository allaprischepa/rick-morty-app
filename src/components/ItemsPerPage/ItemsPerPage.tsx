import { ChangeEvent } from 'react';
import { API_ITEMS_PER_PAGE } from '../../services/api/settings';
import styles from './ItemsPerPage.module.scss';
import { useRouter } from 'next/router';

interface Props {
  defaultValue: string;
  optionsCount?: number;
}

function ItemsPerPage({ defaultValue, optionsCount = 3 }: Props) {
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

    const pathname = '/page/1';
    const queryParams = { itemsPerPage: value, pageID: 1 };
    const query = { ...router.query, ...queryParams };

    router.push({ pathname, query }, pathname);
  };

  return (
    <div className={styles.items_per_page}>
      <div className={styles.label}>Items per page</div>
      <div className={styles.select}>
        <select value={defaultValue} onChange={handleChangeEvent}>
          {options}
        </select>
      </div>
    </div>
  );
}

export default ItemsPerPage;
