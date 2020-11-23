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
import React, {useCallback,  useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';

import {useHistory} from 'react-router-dom';

export default function TransportistaHome()
{
    let { email } = useParams(); 

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });


    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/VentanaOferta'), [history]);
      
      const rows = [];
      const rowsViaj = [];
      
      let [idTransp, setIdTransp] = useState(-1);
      let [UrlApiPedidos, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/pedidos/"
      );
      let [listaPedidos, setListaPedidos] = useState([]);
      let [listaViajes, setListaViajes] = useState([]);

    
  useEffect(() => {
    const solicitudNoticias = {
      method: "GET"
    };

    /*fetch(UrlApiPedidos, solicitudNoticias)
      .then(function (response) {
        return response.json();
      })
      .then(function (resp) {

        Object.entries(resp).map(pedido=>
          {
            pedido.splice(1,1).map(ped=>
              {
                rows.push(ped);
              });
          });
          
          setListaPedidos(rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        // console.log(listaPedidos);
       });

       let mail=
        {
          mail: email
        }

    const formBody = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');

    const solicitud = {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      body: formBody,
    };

    fetch("http://localhost:8080/ApiPPS/transp/mail/", solicitud)
      .then(function (response) {
        return response.json();
      })
      .then(function (resp) {

        setIdTransp(resp.idTransportista);

      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        // console.log(listaPedidos);
       });*/

      let mail=
        {
          email: email
        }

    const formBodyV = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');


    fetch("http://localhost:8080/ApiPPS/viaje/traerPorMailTransp/", {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      body: formBodyV,
    })
       .then(function (response) {
         return response.json();
       })
       .then(function (resp) {
         Object.entries(resp).map(pedido=>
          {
            pedido.splice(1,1).map(ped=>
              {
                rowsViaj.push(ped);
              });
          });
          console.log("Viajes");
          console.log(rowsViaj);
          setTimeout(()=>
          {
            setListaViajes(rowsViaj);
         }, 5000);
          
       })
       .catch((e) => {
         console.log(e);
       })
       .finally(() => {
         // console.log(listaPedidos);
        });

  }, []
  );


    const classes = useStyles();
    
    return (
        <div className="TransportistaHome">

            <Grid>
                <br></br>
                <Row>
                    <Col  xs={5} xl={4} md={4}  > Bienvenido NombreUsuario!</Col>
                    <Col  xs={2} xl={4} md={4}  ></Col>
                    <Col  xs={5} xl={4} md={4} >
                        <Button variant="contained" color="primary" className="botonTipo" onClick={event =>  window.location.href='/CotizacionesPorTta/'+email}>
                            <label className="contenidoBoton">Ver Mis Cotizaciones</label>
                        </Button>
                    </Col>
                </Row>
                <br></br>
                <h2 className="title">Todos estos viajes estan esperando a ser cotizados!</h2>
                <Row>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className="cabeceraTable">
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell align="right">Origen</TableCell>
                                <TableCell align="right">Destino</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Puntuacion</TableCell>
                                <TableCell align="right">Foto</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {listaPedidos.map((row) => (
                                <TableRow onClick={event => console.log(row.infoPedido)} key={row.idPedido}>
                                <TableCell component="th" scope="row">
                                    {row.clienteInfo.email}
                                </TableCell>
                                <TableCell align="right">{row.DireccionOrigen.Ciudad}</TableCell>
                                <TableCell align="right">{row.DireccionLlegada.Ciudad}</TableCell>
                                <TableCell align="right">{row.infoPedido.descripcion}</TableCell>
                                <TableCell align="right">{row.clienteInfo.calificacion}</TableCell>
                                <TableCell align="right">{row.foto}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Row>

                
                <h3 className ="title">Tus Viajes</h3>
                <Row>
                  
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead >
                            <TableRow className="cabeceraTable">
                                <TableCell>Origen</TableCell>
                                <TableCell align="right">Destino</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Cliente</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Foto</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {listaViajes.map((row) => (
                                (<TableRow /*onClick={event => window.location.href = '/CotizacionesPedido/'+row.idPedido}*/ key={row.idPedido}>
                                <TableCell component="th" scope="row">{row.DireccionOrigen.Ciudad}</TableCell>
                                <TableCell align="right">{row.DireccionLlegada.Ciudad}</TableCell>
                                <TableCell align="right">{row.descripcion}</TableCell>
                                <TableCell align="right">{row.infoCliente.email}</TableCell>
                                <TableCell align="right">{row.infoPropuesta.Precio}</TableCell>
                                <TableCell align="right">{"foto"}</TableCell>
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