import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'
import { Button } from '@material-ui/core';


export default function VentanaOferta()
{

    
    return (
        <div className="TransportistaHome">
            <h1>Ofrecer Cotizacion</h1>
            <Grid>
                <Row>
                <Col xs={10} xl={6} md={10} className="centrarCol">
                    <div className="divContenedorDescripcionProducto">
                    <label className="labelInputs">Propuesta</label>  
                    <br/><input align='right' type="select"  style={{height:'10vh', width:'40vw'}}></input>
                    <br/><br/>
                    <label className="labelOferta">Oferta  $ </label><input type="text"></input><br/>   
                        <br/><br/>

                        <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.location.href = '/TransportistaHome'}>
                            <label className="contenidoBotonCancelarAceptar">Cancelar</label>
                        </Button>

                        <Button variant="contained" color="primary" className="botonAceptar" onClick={event => window.location.href = '/TransportistaHome'}>
                            <label >Enviar Oferta</label>
                        </Button>
                        
                    </div>
                </Col>
                </Row>
            </Grid>
        </div>
    );
}