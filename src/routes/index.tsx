import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useEffect } from "react";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

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
      <Route
        path="paginainicial"
        element={
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawerOpen}
          >
            toggle drawer
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/paginainicial" />} />
    </Routes>
  );
};
