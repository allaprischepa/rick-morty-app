import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import './App.scss';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import CharacterDetails from '../CharactersDetails/CharactersDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: 'page/:pageID',
        element: <MainPage />,
        children: [
          {
            path: 'details/:characterID',
            element: <CharacterDetails />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
