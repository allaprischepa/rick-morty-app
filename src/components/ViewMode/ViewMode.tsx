import { useDispatch } from 'react-redux';
import { useSelectorCustom } from '../../state/store';
import {
  VIEW_MODE_GRID,
  VIEW_MODE_LIST,
  setGrid,
  setList,
} from '../../state/viewMode/viewModeSlice';
import styles from './ViewMode.module.scss';

function ViewMode() {
  const viewMode = useSelectorCustom('viewMode');
  const dispatch = useDispatch();

  return (
    <div className={`${styles.view_mode} ${styles[viewMode]}`}>
      <button
        className={`${styles.list}
        ${viewMode === VIEW_MODE_LIST ? styles.active : ''}`}
        onClick={() => dispatch(setList())}
      />
      <button
        className={`${styles.grid}
        ${viewMode === VIEW_MODE_GRID ? styles.active : ''}`}
        onClick={() => dispatch(setGrid())}
      />
    </div>
  );
}

export default ViewMode;
