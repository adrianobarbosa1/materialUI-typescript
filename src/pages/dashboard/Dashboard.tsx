import { FerramentasDetalhe } from "../../components/ferramentasDetalhe/FerramentasDetalhe";
import { FerramentasListagem } from "../../components/ferramentasListagem/FerramentasListagem";
import { LayoutDashboard } from "../../layout/LayoutDashboard";

export const Dashboard = () => {
  return (
    <LayoutDashboard
      titulo="Página Inicial"
      barraFerramentas={<FerramentasDetalhe />}
    >
      teste
    </LayoutDashboard>
  );
};
