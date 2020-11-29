import React, {useCallback,  useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './Home.css'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './ClienteHome.css';

export default function AdministradorHome() {

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    let [UrlApi, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/transp/solicitudesTransp/"
    );
    let [listaTransportistas, setListaTransportistas] = useState([]);
  
    const rows = [];
  
    useEffect(() => {
  
      const solicitudNoticias = {
        method: "GET",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      };
      
        fetch(UrlApi, solicitudNoticias)
        .then(function (response) {
          return response.json();
        })
        .then(function (resp) {
  
            console.log("resp");
            console.log(resp);
      
          Object.entries(resp).map(pedido=>
            {
              pedido.splice(1,1).map(ped=>
                {
                  rows.push(ped);
                });
            });
            console.log("Rows");
            console.log(rows);
            setListaTransportistas(rows);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
          // console.log(listaPedidos);
        });
      
    }, []
    );

    const aceptarTransp = (transp)=>
    {
      setListaTransportistas([]);
      listaTransportistas.splice(listaTransportistas.indexOf(transp), 1);

      setTimeout(()=>
        {
          setListaTransportistas(listaTransportistas);
        }, 500);


        let mail=
            {
              mail: transp.email
            }
    
        const formBody = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');

        fetch("http://localhost:8080/ApiPPS/transp/habilitar/", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
            body: formBody
          })
        .then(function (response) {
          return response.json();
        })
        .then(function (resp) {
  
            console.log("resp");
            console.log(resp);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
          // console.log(listaPedidos);
        });
    }

    const eliminarTransp = (transp)=>
    {
      setListaTransportistas([]);
      listaTransportistas.splice(listaTransportistas.indexOf(transp), 1);

      setTimeout(()=>
        {
          setListaTransportistas(listaTransportistas);
        }, 500);


        let mail=
            {
              mail: transp.email
            }
    
        const formBody = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');

        fetch("http://localhost:8080/ApiPPS/transp/eliminar/", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
            body: formBody
          })
        .then(function (response) {
          return response.json();
        })
        .then(function (resp) {
  
            console.log("resp");
            console.log(resp);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
          // console.log(listaPedidos);
        });
    }
        
    const classes = useStyles();
    
    return (
        <div className="ClienteHome">

            <Grid>
                <br></br>
                <Row>
                    <Col xs={4} > Bienvenido NombreUsuario!</Col>
                    <Col xs={4}>
                        {/* <Button variant="contained" color="primary" className="botonTipo" onClick={event =>  window.location.href='/'}>
                            <label className="contenidoBoton">Volver al home</label>
                        </Button> */}
                    </Col>
                   

                </Row>
                <br></br>
                <Row>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead >
                            <TableRow className="cabeceraTable">
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Patente automovil</TableCell>
                                <TableCell align="right">Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {listaTransportistas.map((row) => (
                              row.habilitado=="0" ?
                                (<TableRow key={row.email}>
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">{row.papeles}</TableCell>
                                <TableCell align="right">{"Usuario nuevo"}</TableCell>
                                <TableCell align="right"><Button onClick={event=>aceptarTransp(row)} variant="contained" color="primary">Aceptar</Button>
                                <Button variant="contained" onClick={event=>eliminarTransp(row)} color="secondary">Cancelar</Button></TableCell>
                                </TableRow>):
                                (<TableRow key={row.email}>
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">{row.papeles}</TableCell>
                                <TableCell align="right">{"Usuario suspendido"}</TableCell>
                                <TableCell align="right"><Button onClick={event=>aceptarTransp(row)} variant="contained" color="primary">Aceptar</Button>
                                <Button variant="contained" onClick={event=>eliminarTransp(row)} color="secondary">Cancelar</Button></TableCell>
                                </TableRow>)
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Row>
            </Grid>
        </div>
    );
}