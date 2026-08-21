import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getNavItemForRoute } from "../components/layout/NavigationStructure";

export function useNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeRoute = location.pathname;
  const activeNavItem = getNavItemForRoute(activeRoute);

  const navigateTo = useCallback((route: string) => {
    navigate(route);
  }, [navigate]);

  return { 
    activeRoute, 
    activeNavItem,
    navigateTo 
  };
}