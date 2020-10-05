import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'
import { Button } from '@material-ui/core';


export default function HacerPedidoCliente()
{

    
    return (
        <div className="TransportistaHome">
            <h1>Cargar los detalles del producto a enviar</h1>
            <Grid>
                <Row>
                <Col xs={5} xl={3} md={5}>
                    <div className="divOrigenDestino">
                        <h4>Origen del producto</h4>
                        <label className="labelInputs">Provincia:</label>  <input align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label><input align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label> <input type="text"></input><br/>
                    <label className="labelInputs">CP: </label> <input align='right' type="number" style={{width: '5vw'}}></input><br/>
                    <label className="labelInputs"> Calle:</label> <input type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> <input type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label><input type="text"></input> <br></br><br/>
                    <label className="labelInputsCargaDescarga">El transportista debera
                     hacerse cargo de la carga del producto en su vehiculo?
                     <input className="CheckBox" type="checkbox"></input></label>
                    </div>
                </Col>

                <Col xs={5} xl={3} md={5}>
                    <div className="divOrigenDestino">
                    <h4>Destino del producto</h4>
                    <label className="labelInputs">Provincia:</label>  <input align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label><input align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label> <input type="text"></input><br/>
                    <label className="labelInputs">CP: </label> <input align='right' type="number" style={{width: '10vw', marginRight:'0px'}}></input><br/>
                    <label className="labelInputs"> Calle:</label> <input type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> <input type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label><input type="text"></input> <br/><br/>
                    <label className="labelInputsCargaDescarga">El transportista debera
                     hacerse cargo de la descarga del producto en su vehiculo?
                     <input className="CheckBox" type="checkbox"></input></label>
                    
                    </div>
                </Col>

                <Col xs={10} xl={6} md={10}>
                    <div className="divContenedorDescripcionProducto">
                    <h4>Producto/s a transportar</h4>
                    <label className="labelInputs">Tipo de producto</label>  <input align='right' type="text"></input><br/>
                    <label className="labelInputs">Transporte apto p/llevar</label><input align='right' type="text"></input><br/>
                    <label className="labelInputs">Medidas</label>  <input align='right' type="select"></input><br/>
                    <label className="labelInputs">Descripcion del pedido</label>  
                    <br/><input align='right' type="select"  style={{height:'10vh', width:'80%'}}>
                        </input><br/><br/>
                        <Button variant="contained" color="primary" className="botonAceptar" onClick={event => window.location.href = '/ClienteHome'}>
                            <label className="contenidoBotonCancelarAceptar">Cargar Pedido</label>
                        </Button>
                        <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.location.href = '/ClienteHome'}>
                            <label className="contenidoBotonCancelarAceptar">Cancelar</label>
                        </Button>
                    </div>
                </Col>
                </Row>
            </Grid>
        </div>
    );
}