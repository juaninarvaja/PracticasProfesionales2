import React, {useCallback,  useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'




export default function ConfirmarCotizacionRecibida() {
   
    let { id } = useParams(); 

    let [UrlApi, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/propuesta/TraerPorId/"
      );

    let [propuesta, setPropuesta] = useState({});
    let [infoTransp, setInfoTransp] = useState({});
      

    useEffect(() => {

        let mail=
            {
              idPropuesta: id
            }
    
        const formBody = Object.keys(mail).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(mail[key])).join('&');
    
        const solicitudNoticias = {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          body: formBody,
        };
    
        fetch(UrlApi, solicitudNoticias)
          .then(function (response) {
            return response.json();
          })
          .then(function (resp) {
    
            console.log("resp");
            console.log(resp);
    
            setPropuesta(resp);
            setInfoTransp(resp.infoTransp);

            /*Object.entries(resp).map(pedido=>
              {
                pedido.splice(1,1).map(ped=>
                  {
                    rows.push(ped);
                  });
              });*/
              
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
           });

    
      }, []
      );
  
    return ( <>
      <h1>Detalles de oferta por su pedido</h1>
      <Grid>
          <Row>
          <Col xs={10} xl={6} md={10} className="centrarCol">
              <div className="divContenedorDescripcionProducto">
              
              <label className="labelInputs">Transportista : </label>  
              <br/><input align='right' type="select"   
              value={infoTransp.email} readOnly> 
              </input>
              <br/><br/>
              <label className="labelInputs">Calificacion: </label>  
              <br/><input align='right' type="select"   
              value={infoTransp.calificacion} readOnly> 
              </input>
              <br/><br/>


              <label className="labelInputs">Propuesta</label>  
              <br/><input align='right' type="select"  style={{height:'10vh', width:'70%'}} 
              value={propuesta.informacion} readOnly> 
              </input>
              <br/><br/>
              <label className="labelOferta">Oferta  $ </label><input type="text" value={propuesta.Precio} readOnly></input><br/>   
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