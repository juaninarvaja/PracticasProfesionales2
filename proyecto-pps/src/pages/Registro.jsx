import React, {useCallback,  useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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


export default function Registro() {
    const classes = useStyles();
  
    const usuarios = [];

    let [UrlApi, setUrlApi] = useState(
      "http://localhost:8080/ApiPPS/usuarios/"
    );
    let [listaUsuarios, setListaUsuarios] = useState([]);
    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");
    let [patente, setPatente] = useState("");
    let [check, setCheck] = useState("transp");
    
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
    
    function validar(email, password)
    {
      let retorno = true;

      listaUsuarios.map(user=>
      {
        if(user.email == email)
        {
            retorno = false;
        }
      });

      return retorno;
    }

    const registrar = (e)=>
    {
      e.preventDefault();

      if(validar(email, pass))
      {
        let usuario;

        if(check == "cliente")
        {
          usuario=
          {
            tipoUsuario: "cliente",
            email: email,
            contrasenia: pass
          }
        }
        else
        {
          usuario=
          {
            tipoUsuario: "transportista",
            email: email,
            contrasenia: pass,
            papeles: patente
          }
        }

        const formBody = Object.keys(usuario).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(usuario[key])).join('&');

        fetch(UrlApi,{
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          body: formBody,
          })
          .then(response=> {
            
            return response.json();
          })
          .then(function (resp) {
            window.location.href='/ClienteHome';
            console.log(resp);
          })
          .catch((e) => {
            console.log(e);
          })
      }
    }

    const cambiarCheck = (cambio)=>
    {
      setCheck(cambio);
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrarse
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

            {check==="transp" &&
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="patente"
              label="Patente del vehiculo"
              id="patente"
              autoComplete="patente"
              value={pass} 
			        onChange={(e) => setPatente(e.target.value)}
            />
            }
            <FormControlLabel
              control={<Checkbox value="remember" 
              checked={check==="transp"}
              color="primary" />}
              label="Transportista"
              onChange={(e)=>cambiarCheck("transp")}
            />
            <FormControlLabel
              control={<Checkbox value="remember"
              checked={check==="cliente"}
              color="primary" />}
              label="Cliente"
              onChange={(e)=>cambiarCheck("cliente")}
            /> <br></br>

            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={event =>  window.location.href='/'}
            >
              Cancelar
            </Button>


            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={registrar}
            >
              Registrarse
            </Button>



          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>);
}