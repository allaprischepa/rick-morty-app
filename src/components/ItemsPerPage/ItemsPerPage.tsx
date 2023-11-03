import { ChangeEvent } from 'react';
import { API_ITEMS_PER_PAGE } from '../../services/dataLoader/settings';
import './ItemsPerPage.scss';

interface Props {
  optionsCount?: number;
  defaultValue: number;
  updateItemsPerPage: (val: number) => void;
}

function ItemsPerPage({
  optionsCount = 3,
  defaultValue,
  updateItemsPerPage,
}: Props) {
  const options: JSX.Element[] = [];

  for (let i = 1; i <= optionsCount; i++) {
    const value = API_ITEMS_PER_PAGE * i;
    options.push(
      <option key={i} value={value}>
        {value}
      </option>
    );
  }

  return (
    <div className="items-per-page">
      <div className="label">Items per page</div>
      <div className="select">
        <select
          value={defaultValue}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            updateItemsPerPage(+event.target.value)
          }
        >
          {options}
        </select>
      </div>
    </div>
  );
}

export default ItemsPerPage;
