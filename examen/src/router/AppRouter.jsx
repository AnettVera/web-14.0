import React, { useContext } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignInPage from '../modules/auth/SignInPage';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../components/layout/AdminLayout';
import ClientLayout from '../components/layout/ClientLayout';
import UserLayout from '../components/layout/UserLayout'

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const routesFromRole = (role) => {
    switch (role) {
      case 'ADMIN_ROLE':
        return (
          <>
            <Route path="/" element={<AdminLayout user={user} />}>
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="users" element={<>Users</>} />
              <Route path="products" element={<>Products</>} />
            </Route>
          </>
        );
      case 'USER_ROLE':
        return (
          <>
            <Route path="/" element={<UserLayout user={user} />}>
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="profile" element={<>User Profile</>} />
            </Route>
          </>
        );
      case 'CLIENT_ROLE':
        return (
          <>
            <Route path="/" element={<ClientLayout user={user} />}>
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="orders" element={<>Orders</>} />
    
            </Route>
          </>
        );
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            {routesFromRole(user?.roles[0]?.name)}
          </>
        ) : (
          <Route path="/" element={<SignInPage />} />
        )}
        <Route path="/*" element={<>404 not found</>} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
