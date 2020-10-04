import React from 'react';
import {  Grid ,  Row ,  Col  } from 'react-flexbox-grid' ; 
import './cabecera.css'

function Cabecera() {
  return (
    <div className="contenedor" onClick={event =>  window.location.href='/Home'} >
      <Grid>
        <Row className="rowCabecera">
          <Col xs={2}>
            <div >
              <img className= "imagenLogo" src="/imagenes/camion.png"></img>
            </div>
          </Col>
          <Col xs={5} className="titulo"> NombrePagina</Col>
          <Col xs={5} className="descripcion">Te lo llevamos lo que sea a donde sea</Col>
        </Row>
      </Grid>
      </div>
  );
}

export default Cabecera;
