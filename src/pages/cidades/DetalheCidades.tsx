import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { FerramentasDetalhe } from "../../components/ferramentasDetalhe/FerramentasDetalhe";
import { LayoutDashboard } from "../../layout/LayoutDashboard";
import { CidadesService } from "../../services/cidades/CidadesService";
import { UnForm, UnTextField, useUnForm } from "../../components/forms";
import * as yup from "yup";
import { IUnFormsErrors } from "../../components/forms/IUnFormsErrors";

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheCidades: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const { formRef, isSaveAndClose, saveAndClose  } = useUnForm();

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    //validação do yup
    formValidationSchema.validate(dados, {abortEarly: false})
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === "nova") {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if(isSaveAndClose()){
                navigate("/cidades");
              }else{
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if(isSaveAndClose()){
                  navigate("/cidades");
                }
              }
            }
          );
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IUnFormsErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
      



  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("registro apagado com sucesso");
          navigate("/cidades");
        }
      });
    }
  };

  return (
    <LayoutDashboard
      titulo={id === "nova" ? "Nova Cidade" : nome}
      barraFerramentas={
        <FerramentasDetalhe
          textButtonNovo="Nova"
          mostrarButtonNovo={id !== "nova"}
          mostrarButtonApagar={id !== "nova"}
          cliqueButtonSalvar={saveAndClose}
          cliqueButtonVoltar={() => navigate("/cidades")}
          cliqueButtonApagar={() => handleDelete(Number(id))}
          cliqueButtonNovo={() => navigate("/cidades/detalhe/nova")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <UnForm ref={formRef} onSubmit={(dados) => handleSave(dados)}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <UnTextField
                  fullWidth
                  name="nome"
                  disabled={isLoading}
                  label="Nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
       
          </Grid>
        </Box>
      </UnForm>
    </LayoutDashboard>
  );
};
