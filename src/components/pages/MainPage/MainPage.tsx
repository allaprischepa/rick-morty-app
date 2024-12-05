import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../state/store';
import { FormDataToSave, formDataToSaveKeys } from '../../../utils/types';
import Layout from '../../Layout/Layout';
import { useDispatch } from 'react-redux';
import { setLastViewed } from '../../../state/data/dataSlice';
import './MainPage.scss';
import { capitilize, isBoolean } from '../../../utils/utils';

function MainPage() {
  const { lastViewedIndex, results } = useAppSelector('data');
  const [highlight, setHighlight] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (results[lastViewedIndex + 1]) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
        dispatch(setLastViewed(lastViewedIndex + 1));
      }, 3000);
    }
  }, [lastViewedIndex, results, dispatch]);

  const renderItemRow = (
    result: FormDataToSave,
    dataKey: keyof FormDataToSave
  ): JSX.Element => {
    return (
      <div className={`results_item_row ${dataKey}`} key={dataKey}>
        <div className="label">{capitilize(dataKey)}</div>
        <div className="data">
          {dataKey === 'profilePicture' ? (
            <img src={result[dataKey]} />
          ) : isBoolean(result[dataKey]) ? (
            '✓'
          ) : (
            result[dataKey]
          )}
        </div>
      </div>
    );
  };

  const renderItem = (result: FormDataToSave): JSX.Element => {
    return (
      <>
        {formDataToSaveKeys.map((dataKey) =>
          result[dataKey] ? renderItemRow(result, dataKey) : null
        )}
      </>
    );
  };

  return (
    <Layout>
      {results.length ? (
        <div className="results">
          {results
            .map((result, key) => ({ result, key }))
            .reverse()
            .map(({ result, key }) => (
              <div
                className={`results_item ${
                  highlight && key === lastViewedIndex + 1 ? 'highlight' : ''
                }`}
                key={key}
              >
                {renderItem(result)}
              </div>
            ))}
        </div>
      ) : (
        <div className="no-results">
          There are no results here. Please, fill the form.
        </div>
      )}
    </Layout>
  );
}

export default MainPage;
