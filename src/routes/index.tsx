import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDrawerContext } from "../contexts/DrawerContext";

export const AppRoutes = () => {
  const { toggleDrawerOpen } = useDrawerContext();

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
