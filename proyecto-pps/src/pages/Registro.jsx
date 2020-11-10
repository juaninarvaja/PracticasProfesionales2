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
      if(validar(email, pass))
      {

        let usuario=
        {
          tipoUsuario: "cliente",
          email: email,
          contrasenia: pass
        }

        console.log(UrlApi);

        fetch(UrlApi,{
          method: "POST",
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(usuario)
          })
          .then(response=> {
            //window.location.href='/ClienteHome';
            return response.text();
          })
          .then(function (resp) {
            console.log(resp);
          })
          .catch((e) => {
            console.log(e);
          })
      }
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Transportista"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Cliente"
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