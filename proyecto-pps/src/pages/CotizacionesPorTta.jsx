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
import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';

export default function CotizacionesPorTta()
{
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    function createData(name, calories, carbs, protein, price) {
        return { name, calories, carbs, protein, price };
      }

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/VentanaOferta'), [history]);
      
      const rows = [
        createData('Marcos', "Mueble de algarrobo medidas 4x6 largo 3x2 ancho", "En espera", "Imagen",5500),
        createData('Ignacio', "Paquete sospechoso","En espera", "Imagen",5800),
        createData('Juan', "Computadora de escritorio", "Otorgado", "Imagen",9000),
        createData('Tomas', "Juego de llantas 18 pulgadas", "Finalizado", "Imagen",9500),
        createData('Hernan', "Heladera medidas 2x0.6 largo 0.4x0.5 ancho", "En espera", "Imagen",15000),
      ];
      
    const classes = useStyles();
    
    return (
        <div className="TransportistaHome">

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
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">ESTADO</TableCell>
                                <TableCell align="right">Foto</TableCell>
                                <TableCell align="right">Precio pasado</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                // <TableRow onClick={handleOnClick} key={row.name}>
                             <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
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