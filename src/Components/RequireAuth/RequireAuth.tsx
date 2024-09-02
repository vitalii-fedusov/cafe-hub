// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import React, { ReactNode } from 'react';
// import { useAppSelector } from '../../app/hooks';

// type Props = {
//   children: ReactNode;
// };

// export const RequireAuth: React.FC<Props> = ({children}) => {
//   const { user } = useAppSelector((state) => state.auth);
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children || <Outlet />;
// };

export {};
