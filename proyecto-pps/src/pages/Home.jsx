import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './Home.css'
import { Button } from '@material-ui/core';
function Home() {
    return (

        <div className="home">

            <Grid>
                <br></br>
                <Row>
                    <Col xs={4} > Bienvenido a NombrePagina!</Col>
                    <Col xs={4}>
                        <Button variant="contained" color="primary" className="botonTipo">
                            <label className="contenidoBoton">Quiero Transportar!</label>
                        </Button>
                    </Col>
                    <Col xs={4}>
                        <Button variant="contained" color="primary" className="botonTipo">
                            <label className="contenidoBoton">Necesito Transporte</label>
                        </Button>
                    </Col>

                </Row>
                <Row>
                    <br></br>
                    <div className="DivHomeDescripcion">
                        <br></br>
                       Somos una solucion de logistica innovadora, garantizando
                        el precio mas competitivo para tus necesidades en caso
                         de que necesites un transporte.
                    <br/>
                    Tambien facilitamos la salida laboral de cualquier persona con un vehiculo apto para transportar 
                    diferentes tipos de mercaderia, en esta paltaforma podras encontrar 
                    diferentes viajes para cotizar.


                    </div>
                    
                </Row>
            </Grid>
        </div>
    );
}

export default Home;