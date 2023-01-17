import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MUIDataTable from "mui-datatables";

import { FerramentasListagem } from "../../components/ferramentasListagem/FerramentasListagem";
import { IListagemPessoa, PessoasService } from "../../services/pessoas/PessoasService";
import { LayoutDashboard } from "../../layout/LayoutDashboard";
import { useDebounce } from "../../hooks/UseDebounce";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";
import { Environment } from "../../environment/environment";

export const ListagemPessoas: React.FC = () => {
  const [searchParams, setSearchParamns] = useSearchParams();
  const { debounce } = useDebounce();

  const [data, setData] = useState<IListagemPessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          setError(result.message);
        } else {
          console.log(result);
          setTotalCount(result.totalCount);
          setData(result.data);
        }
      });
    });
  }, [busca]);

  const columns = [
    {
      name: "acoes",
      label: "Ações",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nomeCompleto",
      label: "Nome Completo",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  // const options = {
  //   filterType: "checkbox",
  // };

  return (
    <LayoutDashboard
      titulo="Listagem de pessoas"
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
    >
      <Box sx={{ marginX: 1, width: "auto" }} component={Paper}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          </Box>
        ) : (
          <MUIDataTable
            title={"Listagemd de Pessoas"}
            data={data}
            columns={columns}
            // options={options}
          />
        )}
      </Box>
    </LayoutDashboard>
  );
};
