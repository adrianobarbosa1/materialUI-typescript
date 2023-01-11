import { FerramentasDetalhe } from "../../components/ferramentasDetalhe/FerramentasDetalhe";
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
