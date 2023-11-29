import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../router/router';

function MainPage() {
  return (
    <div>
      <h1>The Main Page</h1>
      <nav>
        <ul>
          <li>
            <Link to={AppRoutes.FormUC}>Form UC</Link>
          </li>
          <li>
            <Link to={AppRoutes.FormRHF}>Form RHF</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainPage;
