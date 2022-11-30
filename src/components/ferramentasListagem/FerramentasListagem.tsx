import {
  Box,
  Button,
  Icon,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";

interface IFerramentasListagem {
  textBusca?: string;
  mostrarInputBusca?: boolean;
  mudarTextBusca?: (novoTexto: string) => void;
  textButtonNovo?: string;
  mostrarButtonNovo?: boolean;
  cliqueButtonNovo?: () => void;
}

export const FerramentasListagem: React.FC<IFerramentasListagem> = ({
  textBusca = "",
  mostrarInputBusca = false,
  mudarTextBusca,
  textButtonNovo = "Novo",
  mostrarButtonNovo = true,
  cliqueButtonNovo,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          value={textBusca}
          onChange={(e) => mudarTextBusca?.(e.target.value)}
          size="small"
          placeholder="Pesquisar..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <Icon>search</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarButtonNovo && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={cliqueButtonNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textButtonNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
