import React, {useCallback,  useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';

export default function VentanaOferta()
{
    let { idTransp } = useParams();
    let { idPedido } = useParams();

    let [informacion, setInfo] = useState("");
    let [precio, setPrecio] = useState("");

    const subirPropuesta = (e)=>
    {
        let datos=
        {
          idPedido: idPedido,
          idTransportista: idTransp,
          Precio: precio,
          informacion: informacion
        }

    const formBody = Object.keys(datos).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(datos[key])).join('&');

        
    fetch("http://localhost:8080/ApiPPS/propuesta/", {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
      body: formBody,
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (resp) {
        console.log(resp);

        //window.location.href = '/ClienteHome';
      })
      .catch((e) => {
        console.log(e);
      })
      window.history.back();
    }

    
    return (
        <div className="TransportistaHome">
            <h1>Ofrecer Cotizacion</h1>
            <Grid>
                <Row>
                <Col xs={10} xl={6} md={10} className="centrarCol">
                    <div className="divContenedorDescripcionProducto">
                    <label className="labelInputs">Propuesta</label>  
                    <br/><input value={informacion} onChange = {(e) => setInfo(e.target.value)} align='right' type="select"  style={{height:'10vh', width:'30vw'}}></input>
                    <br/><br/>
                    <label className="labelOferta">Oferta  $ </label><input value={precio} onChange = {(e) => setPrecio(e.target.value)} type="text"></input><br/>   
                        <br/><br/>

                        <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.history.back()}>
                            <label className="contenidoBotonCancelarAceptar">Cancelar</label>
                        </Button>

                        <Button variant="contained" color="primary" className="botonAceptar" onClick={subirPropuesta}>
                            <label >Enviar Oferta</label>
                        </Button>
                        
                    </div>
                </Col>
                </Row>
            </Grid>
        </div>
    );
}