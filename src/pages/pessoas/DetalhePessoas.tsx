import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { FerramentasDetalhe } from "../../components/ferramentasDetalhe/FerramentasDetalhe";
import { LayoutDashboard } from "../../layout/LayoutDashboard";
import { PessoasService } from "../../services/pessoas/PessoasService";
import { UnForm, UnTextField, useUnForm } from "../../components/forms";
import * as yup from "yup";
import { IUnFormsErrors } from "../../components/forms/IUnFormsErrors";
import { AutoCompleteCidade } from "./components/AutoCompleteCidades";

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required().min(3)
});

export const DetalhePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const { formRef, isSaveAndClose, saveAndClose  } = useUnForm();

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
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeCompleto: "",
        cidadeId: undefined,
        email: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    //validação do yup
    formValidationSchema.validate(dados, {abortEarly: false})
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === "nova") {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if(isSaveAndClose()){
                navigate("/pessoas");
              }else{
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
        } else {
          PessoasService.updateById(Number(id), { id: Number(id), ...dadosValidados }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if(isSaveAndClose()){
                  navigate("/pessoas");
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
          cliqueButtonSalvar={saveAndClose}
          cliqueButtonVoltar={() => navigate("/pessoas")}
          cliqueButtonApagar={() => handleDelete(Number(id))}
          cliqueButtonNovo={() => navigate("/pessoas/detalhe/nova")}
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
                  name="nomeCompleto"
                  disabled={isLoading}
                  label="Nome completo"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <UnTextField
                  fullWidth
                  name="email"
                  disabled={isLoading}
                  label="Email"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>

       
          </Grid>
        </Box>
      </UnForm>
    </LayoutDashboard>
  );
};
