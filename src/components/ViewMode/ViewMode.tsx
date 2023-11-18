import { useDispatch } from 'react-redux';
import { useSelectorCustom } from '../../state/store';
import {
  VIEW_MODE_GRID,
  VIEW_MODE_LIST,
  setGrid,
  setList,
} from '../../state/viewMode/viewModeSlice';
import './ViewMode.scss';

function ViewMode() {
  const viewMode = useSelectorCustom('viewMode');
  const dispatch = useDispatch();

  return (
    <div className={`view-mode ${viewMode}`}>
      <button
        className={`list ${viewMode === VIEW_MODE_LIST ? 'active' : ''}`}
        onClick={() => dispatch(setList())}
      />
      <button
        className={`grid ${viewMode === VIEW_MODE_GRID ? 'active' : ''}`}
        onClick={() => dispatch(setGrid())}
      />
    </div>
  );
}

export default ViewMode;
