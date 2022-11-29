import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useEffect } from "react";
import { Dashboard } from "../pages/dashboard/Dashboard";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/paginainicial",
        label: "Página Inicial",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="paginainicial" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/paginainicial" />} />
    </Routes>
  );
};
