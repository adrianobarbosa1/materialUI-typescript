import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, CircularProgress, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import * as yup from "yup";

function Copyright(props: any) {
  return (

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {`© ${new Date().getFullYear()} `}
      <Link color="inherit" href="https://www.anapolis.go.gov.br/">
        {"MEU LOGO."}
      </Link>{" Todos os direitos reservados."}
    </Typography>
  );    
}



const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

interface ILoginProps {
    children: React.ReactNode
}

export const Login: React.FC<ILoginProps> = ({children}) => {
  const { isAuthenticated, login} = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(dadosValidados => {
        login(dadosValidados.email, dadosValidados.password)
          .then(() => {
            setIsLoading(false);
          });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach(error => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  if(isAuthenticated) return (
    <>{children}</>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container 
          spacing={0}
          justifyContent="center"> 
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image="https://api.anapolis.go.gov.br/apiupload/logo/mlmh_azul.png"
              alt="Paella dish"
            />
          </Grid>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image="https://api.anapolis.go.gov.br/apiupload/logo/prefeitura_azul.png"
              alt="Paella dish"
            />
          </Grid>
        </Grid>


        <Card
          sx={{padding: "2rem 2rem", borderRadius: "2%", mt: 4, boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px"}}
        >
          <Box>
            <TextField
              fullWidth
              type='email'
              label='Email@email.com'
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError("")}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              required
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              fullWidth
              type='password'
              label='Senha'
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError("")}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              required
              id="password"
              name="password"
              autoComplete="email"
            />
          </Box>
          <Grid container>
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar-me"
              />
            </Grid>
            <Grid item marginTop={"9px"}>
              <Link href="#" variant="body2">
                  Esqueceu a senha?
              </Link>
            </Grid>
          </Grid>
              
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
          >
              Entrar
          </Button>


          {/* <Link href="#" variant="body2">
            <Typography textAlign={"center"}>
            Você tem uma conta? Cadastre-se
            </Typography>
          </Link> */}

        </Card>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Box>

    </Container>
  );
};