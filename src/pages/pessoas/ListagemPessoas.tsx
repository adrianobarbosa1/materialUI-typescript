import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { FerramentasListagem } from "../../components/ferramentasListagem/FerramentasListagem";
import { LayoutDashboard } from "../../layout/LayoutDashboard";
import { PessoasService } from "../../services/PessoasService";

export const ListagemPessoas: React.FC = () => {
  const [searchParams, setSearchParamns] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    PessoasService.getAll().then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);
      }
    });
  }, []);

  return (
    <LayoutDashboard
      titulo="Listagem de cidades"
      barraFerramentas={
        <FerramentasListagem
          mostrarInputBusca
          textButtonNovo="Nova"
          textBusca={busca}
          mudarTextBusca={(text) =>
            setSearchParamns({ busca: text }, { replace: true })
          }
        />
      }
    ></LayoutDashboard>
  );
};
