import React, {useCallback,  useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'
import { isConstructorDeclaration } from 'typescript';




export default function AccionesViajesCliente() {
   
    let { id } = useParams(); 

    let [UrlApi, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/viaje/traerPorIdPedido/"
      );

    let [viajeInfos , setViajeInfo] = useState([]);
    
    const recibirPedido = ()=>
    {
      let infoViaje=
      {
        estado: "Recibido",
        idViaje: viajeInfos[0].idViaje
      }
      const ViajeBody = Object.keys(infoViaje).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(infoViaje[key])).join('&');


      fetch("http://localhost:8080/ApiPPS/viaje/estado/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
        body: ViajeBody,
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (resp) {
          console.log(resp);
  
          window.history.back();
        })
        .catch((e) => {
          console.log(e);
        })
      // redireccionar
    }

    const renunciarPedido = ()=>
    {
      let infoViaje=
      {
        tipo: "cliente",
        idViaje: viajeInfos[0].idViaje
      }
      const ViajeBody = Object.keys(infoViaje).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(infoViaje[key])).join('&');


      fetch("http://localhost:8080/ApiPPS/viaje/cancelarViaje/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
        body: ViajeBody,
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
      // redireccionar
    }
  
    const rows = [];

    useEffect(() => {

        let mail=
            {
              idPedido: id
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

            Object.entries(resp).map(pedido=>
              {
                pedido.splice(1,1).map(ped=>
                  {
                    rows.push(ped);
                  });
              });

            console.log(resp);
            setViajeInfo(rows);
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
           });
      }, []
      );


  
    return ( <>
      <h1>Detalles del Pedido</h1>
      <Grid>
      <Row>
        <Col xs={4}> </Col>
                    <Col xs={4}>
                        {/* Hacer el boton para las encuestas <Button variant="contained" color="primary" className="botonTipo" onClick={event =>  window.location.href='/'}>
                            <label className="contenidoBoton">Volver al home</label>
                        </Button> */}
                    </Col>
                    <Col xs={4}>
                    {viajeInfos.map((viajeInfo) => (
                    viajeInfo.estado == "Viaje Pactado"?
                  (<Button key={viajeInfo.idViaje} variant="contained" color="secondary" className="botonCancelar" onClick={event=>renunciarPedido()}>
                            <label >Renunciar al pedido</label>
                        </Button>):null
                    ))}
                    </Col>

                </Row>


          <Row>
          <Col xs={5} xl={3} md={5} className="centrarCol">
              {viajeInfos.map((viajeInfo) => (
              <div key={viajeInfo.idViaje} className="divOrigenDestino">
                    <h4>Origen del producto</h4>
                    <label className="labelInputs">Provincia:</label>  <input readOnly value={viajeInfo.DireccionOrigen.Provincia} align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label><input readOnly value={viajeInfo.DireccionOrigen.Departamento} align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label> <input readOnly value={viajeInfo.DireccionOrigen.Ciudad} type="text"></input><br/>
                    <label className="labelInputs">CP: </label> <input readOnly align='right' value={viajeInfo.DireccionOrigen.CP} type="number" style={{width: '5vw'}}></input><br/>
                    <label className="labelInputs"> Calle:</label> <input readOnly value={viajeInfo.DireccionOrigen.Calle} type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> <input readOnly value={viajeInfo.DireccionOrigen.Numeracion} type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label><input readOnly value={viajeInfo.DireccionOrigen.InfoExtra} type="text"></input> <br></br><br/>
                    </div>
                    ))}
                </Col>

                <Col xs={5} xl={3} md={5}>
                {viajeInfos.map((viajeInfo) => (
                    <div key={viajeInfo.idViaje} className="divOrigenDestino">
                    <h4>Destino del producto</h4>
                    <label className="labelInputs">Provincia:</label>  <input readOnly value={viajeInfo.DireccionLlegada.Provincia} align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label><input readOnly value={viajeInfo.DireccionLlegada.Departamento} align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label> <input readOnly value={viajeInfo.DireccionLlegada.Ciudad} type="text"></input><br/>
                    <label className="labelInputs">CP: </label> <input readOnly value={viajeInfo.DireccionLlegada.CP} align='right' type="number" style={{width: '10vw', marginRight:'0px'}}></input><br/>
                    <label className="labelInputs"> Calle:</label> <input readOnly value={viajeInfo.DireccionLlegada.Calle} type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> <input readOnly value={viajeInfo.DireccionLlegada.Numeracion} type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label><input readOnly value={viajeInfo.DireccionLlegada.InfoExtra} type="text"></input> <br/><br/>
                    </div>
                    ))}
                </Col>

                <Col xs={10} xl={6} md={10}>
                {viajeInfos.map((viajeInfo) => (
                    <div key={viajeInfo.idViaje} className="divContenedorDescripcionProducto">
                    <h4>Producto/s a transportar</h4>
                    <label className="labelInputs">Transportista</label>  <input readOnly value={viajeInfo.infoPropuesta.infoTransp.email} align='right' type="text"></input><br/>
                    <label className="labelInputs">Precio</label><input readOnly value={viajeInfo.infoPropuesta.Precio} align='right' type="text"></input><br/>
                    <label className="labelInputs">Puntuacion</label>  <input value={viajeInfo.infoPropuesta.infoTransp.calificacion} readOnly align='right' type="select"></input><br/>
                    <label className="labelInputs">Descripcion del pedido</label>  
                    <br/><input readOnly value={viajeInfo.infoPedido.descripcion} align='right' type="select"  style={{height:'10vh', width:'80%'}}>
                        </input><br/><br/>
                    </div>
                    ))}
                </Col>
                
                    <div className="centrarCol">
                  <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.history.back()}>
                      <label className="contenidoBotonCancelarAceptar">Cancelar</label>
                  </Button>
                  {viajeInfos.map((viajeInfo) => (
                    viajeInfo.estado == "Entregado"?
                  (<Button key={viajeInfo.idViaje} variant="contained" color="primary" className="botonAceptar" onClick={event=> recibirPedido()}>
                   {/* onClick={event => window.location.href = '/ClienteHome'}> */}
                      <label >Pedido Recibido</label>
                  </Button>):null
                  ))}
                  {viajeInfos.map((viajeInfo) => (
                    viajeInfo.estado == "Recibido" || viajeInfo.estado == "Calificado por cliente"?
                  (<Button key={viajeInfo.idViaje} variant="contained" color="primary" className="botonAceptar" onClick={event=> console.log("llamar a puntuar")}>
                   {/* onClick={event => window.location.href = '/ClienteHome'}> */}
                      <label >Hacer encuesta</label>
                  </Button>):null
                  ))}
                  </div>
          </Row>
      </Grid>
      </>)
}