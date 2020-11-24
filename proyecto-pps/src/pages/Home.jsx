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
                    <Col xs={4} xl={4} md={4} className="Welcome"> Bienvenido a TransportApp!</Col>
                    <Col xs={3} xl={3} md={3}>
                        <Button variant="contained" color="primary" className="botonTipo" onClick={event => window.location.href = '/Login'}>
                            <label className="contenidoBoton">Quiero Transportar!</label>
                        </Button>
                    </Col>
                    <Col xs={1} xl={2} md={2}> </Col>
                    <Col xs={3} xl={3} md={3}>
                        <Button variant="contained" color="primary" className="botonTipo" onClick={event => window.location.href = '/Login'}>
                            <label className="contenidoBoton">Necesito Transporte!</label>
                        </Button>
                    </Col>
                </Row>
                <br></br>
                
                    <div >
                        <img className="imagenBanner" src="/imagenes/flota.jpg"></img>
                    </div>
                
                <Row>
                    <br></br>
                    <div className="DivHomeDescripcion">
                        
                       Somos una solucion de logistica innovadora, garantizando
                        el precio mas competitivo para tus necesidades en caso
                         de que necesites un transporte.
                    <br />
                    Tambien facilitamos la salida laboral de cualquier persona con un vehiculo apto para transportar
                    diferentes tipos de mercaderia, en esta paltaforma podras encontrar
                    diferentes viajes para cotizar.
                    </div>

                </Row>
                <br></br>
                <br></br>
                <div >
                        <img className="imagenBanner" src="/imagenes/banner.jpg"></img>
                    </div>
                    <br></br>
                    <Row>
                    <br></br>
                    <div className="DivHomeDescripcion">
                        
                       Animate a sumarte a la nueva forma de transportar productos, todas las herramientas
                       al alcance de tus manos.
                    <br />
                    <br />
                        Tenes un vechiculo? Que estas esperando para ponerlo a generar ingresos? 
                        La mejor opcion sin comisiones! 
                    </div>
                    <br /><br /><br />

                </Row>
            </Grid>
        </div>
    );
}

export default Home;