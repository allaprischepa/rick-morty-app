import ErrorPage from '../components/pages/ErrorPage/ErrorPage';
import MainPage from '../components/pages/MainPage/MainPage';
import FormUC from '../components/pages/FormUC/FormUC';
import FormRHF from '../components/pages/FormRHF/FormRHF';
import { createBrowserRouter } from 'react-router-dom';

export enum AppRoutes {
  MainPage = '/',
  FormUC = '/form-uncontrolled-components',
  FormRHF = '/form-react-hook-form',
}

export const appRouter = createBrowserRouter([
  {
    path: AppRoutes.MainPage,
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.FormUC,
    element: <FormUC />,
    errorElement: <ErrorPage />,
  },
  {
    path: AppRoutes.FormRHF,
    element: <FormRHF />,
    errorElement: <ErrorPage />,
  },
]);
