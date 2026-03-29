import { Outlet } from "react-router";

export const AuthGuard = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};