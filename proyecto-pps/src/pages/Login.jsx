import React, {useCallback,  useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
    const classes = useStyles();

    const usuarios = [];

let [UrlApi, setUrlApi] = useState(
  "http://localhost:8080/ApiPPS/usuarios/"
);
let [listaUsuarios, setListaUsuarios] = useState([]);
let [email, setEmail] = useState("");
let [pass, setPass] = useState("");

useEffect(() => {
const solicitudNoticias = {
method: "GET"
};

fetch(UrlApi, solicitudNoticias)
.then(function (response) {
  return response.json();
})
.then(function (resp) {
  console.log(resp);

  Object.entries(resp).map(pedido=>
    {
      pedido.splice(1,1).map(ped=>
        {
          usuarios.push(ped);
        });
    });
    console.log("Rows");
    console.log(usuarios);
    setListaUsuarios(usuarios);
})
.catch((e) => {
  console.log(e);
})
.finally(() => {
  // console.log(listaPedidos);
 });
}, []);

function logear(email, password, pagina)
{
  let retorno = false;

  listaUsuarios.map(user=>
    {
      switch(pagina)
      {
        case "Cliente":
          if(user.email == email && user.contrasenia == password)
          {
            retorno = true;
            break;
          }
          break;
        case "Transportista":
          if(user.email == email && user.contrasenia == password && (user.tipoUsuario == "transportista" || user.tipoUsuario == "admin"))
          {
            retorno = true;
            break;
          }
          break;
        case "Admin":
          if(user.email == email && user.contrasenia == password && user.tipoUsuario == "admin")
          {
            retorno = true;
            break;
          }
          break;

      }
    })

    return retorno;
}

const history = useHistory();
const logInTransp = (e) =>{ 

  if(logear(email, pass, "Transportista"))
  {
    window.location.href='/TransportistaHome'
  }
}

const logInCliente = (e)=>
{
  if(logear(email, pass, "Cliente"))
  {
    window.location.href='/ClienteHome'
  }
}

const logInAdmin = (e)=>
{
  if(logear(email, pass, "Admin"))
  {
    window.location.href='/AdminHome'
  }
}
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value = {email} 
			        onChange = {(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pass} 
			        onChange={(e) => setPass(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Transportista"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Cliente"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Administrador"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={logInTransp}
            >
              LogIn Transportista
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={logInCliente}
            >
              LogIn Cliente
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={logInAdmin}
            >
              LogIn Administrador
            </Button>
          </form>

          <label>No tenes cuenta, registrate <Link to="/Registro">aca</Link></label>
        </div>
        <Box mt={8}>
        </Box>
      </Container>);
}