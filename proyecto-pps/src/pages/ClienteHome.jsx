import React, {useCallback,  useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useParams  } from 'react-router-dom';
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
import TusViajes from '../componentes/tusViajes';

export default function ClienteHome() {

    let { email } = useParams(); 

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

      const rows = [];
      const rowsViaj = [];
      
      let [idCliente, setIdCliente] = useState(-1);
      let [UrlApiPedidos, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/cliente/pedidos/"
      );
      let [listaPedidos, setListaPedidos] = useState([]);
      let [listaViajes, setListaViajes] = useState([]);
      let [calificacion, setCalificacion] = useState(0);

      
      const handleOnClick = (e) => {
      console.log(e.target.value);
      };
      //history.push('/VentanaOferta'), [history]);

    
  useEffect(() => {

    let mail=
        {
          mail: email
        }

    const formBody = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');

    const solicitudNoticias = {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      body: formBody,
    };

    fetch(UrlApiPedidos, solicitudNoticias)
      .then(function (response) {
        return response.json();
      })
      .then(function (resp) {

        console.log("resp");
        console.log(resp);
        setCalificacion(resp.calificacion);
        setIdCliente(resp.id);

        Object.entries(resp.pedidosCliente).map(pedido=>
          {
            pedido.splice(1,1).map(ped=>
              {
                rows.push(ped);
              });
          });
          console.log("Rows");
          console.log(rows);
          setListaPedidos(rows);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        // console.log(listaPedidos);
       });

       mail=
       {
         email: email
       }

     const formBodyV = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');


       fetch("http://localhost:8080/ApiPPS/viaje/traerPorMailCliente/", {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      body: formBodyV,
    })
       .then(function (response) {
         return response.json();
       })
       .then(function (resp) {
         console.log(resp);
         Object.entries(resp).map(pedido=>
          {
            pedido.splice(1,1).map(ped=>
              {
                rowsViaj.push(ped);
              });
          });
          console.log("Viajes");
          setListaViajes(rowsViaj);
       })
       .catch((e) => {
         console.log(e);
       })
       .finally(() => {
         // console.log(listaPedidos);
        });

  }, []
  );

  const irAltaPedido = (e)=>
  {
    window.location.href='/HacerPedidoCliente/' + idCliente;
  }

  const irCotizacionesPedido = (e)=>
  {
    window.location.href='/HacerPedidoCliente/' + idCliente;
  }

      
    const classes = useStyles();
    
    return (
        <div className="ClienteHome">

            <Grid>
                <br></br>
                <Row>
    <Col xs={4} > Bienvenido {email}!
    <h2 className="title"> tu calificacion {calificacion}</h2>
    
    </Col>
                    <Col xs={4}>
                        {/* <Button variant="contained" color="primary" className="botonTipo" onClick={event =>  window.location.href='/'}>
                            <label className="contenidoBoton">Volver al home</label>
                        </Button> */}
                    </Col>
                    <Col xs={4}>
                        <Button variant="contained" color="primary" className="botonTipo" onClick={irAltaPedido}>
                            <label className="contenidoBoton">Hacer un pedido</label>
                        </Button>
                    </Col>

                </Row>
                <br></br>
                <h3 className ="title">Tus pedidos</h3>
                <Row>
                  
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead >
                            <TableRow className="cabeceraTable">
                                <TableCell>Origen</TableCell>
                                <TableCell align="right">Destino</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Foto</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                   
                            {listaPedidos.map((row) => (
                                row.estado == "POSTEADO" ?
                                (<TableRow onClick={event => window.location.href = '/CotizacionesPedido/'+row.idPedido} key={row.idPedido}>
                                <TableCell component="th" scope="row">{row.DireccionOrigenInfo.Ciudad}</TableCell>
                                <TableCell align="right">{row.DireccionLlegadaInfo.Ciudad}</TableCell>
                                <TableCell align="right">{row.descripcion}</TableCell>
                                <TableCell align="right">{row.foto}</TableCell>
                                </TableRow>) : null
                              
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Row>
                <br></br>
                
                <br></br>
                <h3 className ="title">Tus Viajes</h3>
                <Row>
                  
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead >
                            <TableRow className="cabeceraTable">
                                <TableCell>Origen</TableCell>
                                <TableCell align="right">Destino</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Transportista</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Estado del envio</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody> 
                            {listaViajes.map((row) => (
                              row.estado == "Viaje Pactado" || row.estado == "Entregado" || row.estado == "Calificado por Transportista" ?
                                (<TableRow onClick={event => window.location.href = '/AccionesViajesCliente/'+row.idPedido} key={row.idPedido}>
                                <TableCell component="th" scope="row">{row.DireccionOrigen.Ciudad}</TableCell>
                                <TableCell align="right">{row.DireccionLlegada.Ciudad}</TableCell>
                                <TableCell align="right">{row.infoPedido.descripcion}</TableCell>
                                <TableCell align="right">{row.infoPropuesta.infoTransp.email}</TableCell>
                                <TableCell align="right">{row.infoPropuesta.Precio}</TableCell>
                                <TableCell align="right">{row.estado}</TableCell>
                                </TableRow>):null
                              
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Row>
            </Grid>
            <br></br>
        </div>
    );
}