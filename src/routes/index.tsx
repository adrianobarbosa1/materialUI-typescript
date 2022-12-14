import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useEffect } from "react";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ListagemPessoas } from "../pages/pessoas/ListagemPessoas";
import { DetalhePessoas } from "../pages/pessoas/DetalhePessoas";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { path: "/paginainicial", icon: "home", label: "Página Inicial" },
      { path: "/pessoas", icon: "people", label: "Pessoas" },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/paginainicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemPessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalhePessoas />} />

      <Route path="*" element={<Navigate to="/paginainicial" />} />
    </Routes>
  );
};
