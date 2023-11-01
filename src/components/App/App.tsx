import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage, { loader as mainPageLoader } from '../pages/MainPage/MainPage';
import './App.scss';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: mainPageLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
