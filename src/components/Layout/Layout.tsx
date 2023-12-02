import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../router/router';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={AppRoutes.MainPage}>Main</NavLink>
          </li>
          <li>
            <NavLink to={AppRoutes.FormUC}>Form UC</NavLink>
          </li>
          <li>
            <NavLink to={AppRoutes.FormRHF}>Form RHF</NavLink>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}

export default Layout;
