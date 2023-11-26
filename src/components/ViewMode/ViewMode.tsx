import {
  VIEW_MODE_GRID,
  VIEW_MODE_LIST,
} from '../../state/viewMode/viewModeSlice';
import styles from './ViewMode.module.scss';
import { useRouter } from 'next/router';

function ViewMode({ viewMode }) {
  const router = useRouter();

  const setViewMode = (mode: string) => {
    const pathname = router.asPath;
    const queryParams = { viewMode: mode };
    const query = { ...router.query, ...queryParams };

    router.push({ pathname, query }, pathname);
  };

  return (
    <div className={`${styles.view_mode} ${styles[viewMode]}`}>
      <button
        className={`${styles.list}
        ${viewMode === VIEW_MODE_LIST ? styles.active : ''}`}
        onClick={() => setViewMode(VIEW_MODE_LIST)}
      />
      <button
        className={`${styles.grid}
        ${viewMode === VIEW_MODE_GRID ? styles.active : ''}`}
        onClick={() => setViewMode(VIEW_MODE_GRID)}
      />
    </div>
  );
}

export default ViewMode;
