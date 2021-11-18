import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//

import Validators from './pages/Validators';
import NotFound from './pages/Page404';
import DashboardAppContainer from "./pages/DashboardAppContainer";
import Transactions from "./pages/Transactions";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardAppContainer /> },
        { path: 'validators', element: <Validators /> },
        { path: 'transactions', element: <Transactions /> },
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
