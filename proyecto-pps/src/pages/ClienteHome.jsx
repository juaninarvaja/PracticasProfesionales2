import React from 'react';
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


export default function ClienteHome() {

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Roberto', "Yo lo llevo pero no lo bajo", 2500, 3.5, "Imagen"),
        createData('Juan Carlos', "Para el miercoles esta", 2100, 4.7, "Imagen"),
        createData('Jorge', "Te lo llevo el martes", 3000, 4.2, "Imagen"),
        createData('Gaston', "Lo llevo el jueves, lo subo y lo bajo", 2800, 5, "Imagen"),
        createData('Pedro', "No lo subo ni lo bajo, para el lunes esta", 2000, 3.2, "Imagen"),
      ];
      
    const classes = useStyles();
    
    return (
        <div className="ClienteHome">

            <Grid>
                <br></br>
                <Row>
                    <Col xs={4} > Bienvenido NombreUsuario!</Col>
                    <Col xs={4}>
                        <Button variant="contained" color="primary" className="botonTipo" onClick={event =>  window.location.href='/'}>
                            <label className="contenidoBoton">Volver al home</label>
                        </Button>
                    </Col>
                    <Col xs={4}>
                        <Button variant="contained" color="primary" className="botonTipo">
                            <label className="contenidoBoton">Hacer un pedido</label>
                        </Button>
                    </Col>

                </Row>
                <Row>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                                <TableCell align="right">Precio</TableCell>
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
                                <TableCell align="right">${row.fat}</TableCell>
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