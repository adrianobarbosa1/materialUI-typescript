import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useEffect } from "react";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ListagemPessoas } from "../pages/pessoas/ListagemPessoas";
import { DetalhePessoas } from "../pages/pessoas/DetalhePessoas";
import { ListagemCidades } from "../pages/cidades/ListagemCidades";
import { DetalheCidades } from "../pages/cidades/DetalheCidades";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { path: "/paginainicial", icon: "home", label: "Página Inicial" },
      { path: "/cidades", icon: "location_city", label: "Cidades" },
      { path: "/pessoas", icon: "people", label: "Pessoas" },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/" />
      <Route path="/paginainicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemPessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalhePessoas />} />

      <Route path="/cidades" element={<ListagemCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheCidades />} />

      <Route path="*" element={<Navigate to="/paginainicial" />} />
    </Routes>
  );
};
