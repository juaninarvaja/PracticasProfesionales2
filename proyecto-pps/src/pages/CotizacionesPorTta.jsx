import { Grid, Row, Col } from 'react-flexbox-grid';
import { useParams  } from 'react-router-dom';
import './Home.css'
import ReactDOM from 'react-dom' 
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
import {useHistory} from 'react-router-dom';

export default function CotizacionesPorTta()
{
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/VentanaOferta'), [history]);

    let { email } = useParams(); 

    let [UrlApi, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/propuesta/TraerPorEmailTransp/"
      );
    let [listaCotizaciones, setListaCotizaciones] = useState([]);

    const rows = [];

    useEffect(() => {

        let mail=
            {
              email: email
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
      

    const quitarCot = (idProp)=>
    {      
      setListaCotizaciones([]);
      listaCotizaciones.splice(listaCotizaciones.indexOf(idProp), 1);

      setTimeout(()=>
        {
          setListaCotizaciones(listaCotizaciones);
        }, 500);

      let idCot = 
      {
        idPropuesta: idProp.idPropuesta
      }

      const formBodyCot = Object.keys(idCot).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(idCot[key])).join('&');
    
        fetch("http://localhost:8080/ApiPPS/propuesta/cancelar/", {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          body: formBodyCot,
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
    }

    const classes = useStyles();
    
    return (
        <div className="TransportistaHome" id="CotTransp">

            <Grid>
                <br></br>
                <Row>
                    <Col  xs={5} xl={4} md={4}  > Bienvenido NombreUsuario!</Col>
                    <Col  xs={2} xl={4} md={4}  ></Col>
                    <Col  xs={5} xl={4} md={4} >
                        {/* <Button variant="contained" color="primary" className="botonTipo" onClick={event =>  window.location.href='/CotizacionesPorTta'}>
                            <label className="contenidoBoton">Ver Mis Cotizaciones</label>
                        </Button> */}
                    </Col>
                </Row>
                <br></br>
                <h2 >Este es el estado de tus Cotizaciones, buena suerte!</h2>
                <Row>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className="cabeceraTable">
                            <TableRow>
                                <TableCell>Cliente</TableCell>
                                <TableCell align="right">Puntuacion Cliente</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">ESTADO</TableCell>
                                <TableCell align="right">Precio Pasado</TableCell>
                                <TableCell align="right">Quitar Cotizacion</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {listaCotizaciones.map((row) => (
                                // <TableRow onClick={handleOnClick} key={row.name}>
                             <TableRow key={row.idPedido}>
                                <TableCell component="th" scope="row">
                                    {row.infoCliente.email}
                                </TableCell>
                                <TableCell align="right">{row.infoCliente.calificacion}</TableCell>
                                <TableCell align="right">{row.infoPedido.descripcion}</TableCell>
                                <TableCell align="right">{row.infoPedido.estado}</TableCell>
                                <TableCell align="right">{row.Precio}</TableCell>
                                <TableCell align="right">
                                <Button variant="contained" onClick={e=>quitarCot(row)} color="secondary">Quitar</Button>
                                </TableCell>
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