import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

export const AuthGuard = () => {

  const { user, loading } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, []);

  if(loading){
    return (
      <LoadingSpinner loading={loading} text="Verifying session..."/>
    )
  }

  return user ? <Outlet /> : null;

};