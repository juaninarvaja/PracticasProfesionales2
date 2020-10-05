import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'




export default function ConfirmarCotizacionRecibida() {
   
  
    return ( <>
      <h1>Detalles de oferta por su pedido</h1>
      <Grid>
          <Row>
          <Col xs={10} xl={6} md={10} className="centrarCol">
              <div className="divContenedorDescripcionProducto">
              
              <label className="labelInputs">Transportista : </label>  
              <br/><input align='right' type="select"   
              value={"Juan Carlos Messi"} readOnly> 
              </input>
              <br/><br/>
              <label className="labelInputs">Calificacion: </label>  
              <br/><input align='right' type="select"   
              value={"4.5"} readOnly> 
              </input>
              <br/><br/>


              <label className="labelInputs">Propuesta</label>  
              <br/><input align='right' type="select"  style={{height:'10vh', width:'70%'}} 
              value={"Te lo llevo pero no me hagas laburar mucho"} readOnly> 
              </input>
              <br/><br/>
              <label className="labelOferta">Oferta  $ </label><input type="text" value={"8500"} readonly></input><br/>   
                  <br/><br/>

                  <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.location.href = '/ClienteHome'}>
                      <label className="contenidoBotonCancelarAceptar">Cancelar</label>
                  </Button>

                  <Button variant="contained" color="primary" className="botonAceptar" onClick={event => window.location.href = '/ClienteHome'}>
                      <label >Aceptar Oferta</label>
                  </Button>
                  
              </div>
          </Col>
          </Row>
      </Grid>
      </>)
}