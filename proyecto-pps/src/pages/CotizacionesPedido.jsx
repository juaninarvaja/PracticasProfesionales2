import React, {useCallback,  useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
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

export default function CotizacionesPedido() {

    let { id } = useParams(); 

    let [UrlApi, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/pedidos/propuestas/"
      );
    let [listaCotizaciones, setListaCotizaciones] = useState([]);

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      
      const rows = [];

    useEffect(() => {

        let mail=
            {
              idPedido: id
            }
    
        const formBody = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');
    
        const solicitudNoticias = {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          body: formBody,
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
              setListaCotizaciones(rows);
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
                    <Col xs={4}>
                        <Button variant="contained" color="primary" className="botonTipo" onClick={event =>  window.location.href='/HacerPedidoCliente'}>
                            <label className="contenidoBoton">Hacer un pedido</label>
                        </Button>
                    </Col>

                </Row>
                <br></br>
                <Row>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead >
                            <TableRow className="cabeceraTable">
                                <TableCell>Usuario</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Puntuacion</TableCell>
                                <TableCell align="right">Foto</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {listaCotizaciones.map((row) => (
                                <TableRow key={row.idTransportista} onClick={event =>  window.location.href='/ConfirmarCotizacion/' + row.idPropuesta} >
                                <TableCell component="th" scope="row">
                                    {row.infoTransp.email}
                                </TableCell>
                                <TableCell align="right">{row.informacion}</TableCell>
                                <TableCell align="right">${row.Precio}</TableCell>
                                <TableCell align="right">{row.infoTransp.calificacion}</TableCell>
                                <TableCell align="right">{row.infoTransp.papeles}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Row>
            </Grid>

        </div>
    );
}