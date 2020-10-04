import React from 'react'
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

export default function TransportistaHome()
{
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    function createData(name, calories, carbs, protein) {
        return { name, calories, carbs, protein };
      }
      
      const rows = [
        createData('Marcos', "Mueble de algarrobo medidas 4x6 largo 3x2 ancho", 4, "Imagen"),
        createData('Ignacio', "Paquete sospechoso", 1.7, "Imagen"),
        createData('Juan', "Computadora de escritorio", 2.9, "Imagen"),
        createData('Tomas', "Juego de llantas 18 pulgadas", 5, "Imagen"),
        createData('Hernan', "Heladera medidas 2x0.6 largo 0.4x0.5 ancho", 3.2, "Imagen"),
      ];
      
    const classes = useStyles();
    
    return (
        <div className="TransportistaHome">

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
                <h2 >Todos estos viajes estan esperando a ser cotizados!</h2>
                <Row>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className="cabeceraTable">
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Puntuacion</TableCell>
                                <TableCell align="right">Foto</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
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