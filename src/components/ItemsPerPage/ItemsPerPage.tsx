import { ChangeEvent } from 'react';
import { API_ITEMS_PER_PAGE } from '../../services/dataLoader/settings';
import './ItemsPerPage.scss';
import { useSelectorCustom } from '../../state/store';
import { useDispatch } from 'react-redux';
import { updateItemsPerPage } from '../../state/itemsPerPage/itemsPerPageSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  optionsCount?: number;
}

function ItemsPerPage({ optionsCount = 3 }: Props) {
  const itemsPerPage = useSelectorCustom('itemsPerPage');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    if (itemsPerPage !== value) navigate('/page/1', { replace: true });
  };

  return (
    <div className="items-per-page">
      <div className="label">Items per page</div>
      <div className="select">
        <select value={itemsPerPage} onChange={handleChangeEvent}>
          {options}
        </select>
      </div>
    </div>
  );
}

export default ItemsPerPage;
