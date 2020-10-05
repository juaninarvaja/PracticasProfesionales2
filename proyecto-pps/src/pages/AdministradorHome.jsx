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
import './ClienteHome.css';

export default function AdministradorHome() {

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Roberto@gmail.com', "Archivo", 2500, 3.5, "Imagen"),
        createData('marquitos22@aol.com', "Archivo", 2100, 4.7, "Imagen"),
        createData('Pedromanzotti@gmail.com', "Archivo", 3000, 4.2, "Imagen"),
        createData('gastonsitoatr@hotmail.com', "Archivo", 2800, 5, "Imagen"),
        createData('incontratable@gmail.com', "Archivo", 2000, 3.2, "Imagen"),
      ];
      
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
                                <TableCell align="right">Documento</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right"><Button  variant="contained" color="primary">Aceptar</Button>
                                <Button variant="contained" color="secondary">Cancelar</Button></TableCell>
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