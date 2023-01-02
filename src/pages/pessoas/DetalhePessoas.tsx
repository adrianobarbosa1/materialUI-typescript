import { LinearProgress, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDetalhe } from "../../components/ferramentasDetalhe/FerramentasDetalhe";
import { LayoutDashboard } from "../../layout/LayoutDashboard";
import { PessoasService } from "../../services/PessoasService";

export const DetalhePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log("savhandleSavee");
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("registro apagado com sucesso");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutDashboard
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraFerramentas={
        <FerramentasDetalhe
          textButtonNovo="Nova"
          mostrarButtonNovo={id !== "nova"}
          mostrarButtonApagar={id !== "nova"}
          cliqueButtonSalvar={() => handleSave()}
          cliqueButtonApagar={() => handleDelete(Number(id))}
          cliqueButtonNovo={() => navigate("/pessoas/detalhe/nova")}
          cliqueButtonVoltar={() => navigate("/pessoas")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <p>teste</p>
    </LayoutDashboard>
  );
};
