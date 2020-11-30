import React, {useCallback,  useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'
import { isConstructorDeclaration } from 'typescript';
import MensajeError from '../componentes/mensajeError';




export default function AccionesViajes() {
   
    let { id } = useParams(); 

    let [UrlApi, setUrlApi] = useState(
        "http://localhost:8080/ApiPPS/viaje/traerPorIdPedido/"
      );

    let [viajeInfos , setViajeInfo] = useState([]);
    let [abiertoPun, setAbiertoPuntuacion] = useState(false);
    let [mensajePun, setMensajePuntuacion] = useState("");
    let [puntuacion, setPuntuacion] = useState("0");
    let [abierto, setAbierto] = useState(false);
    let [mensaje, setMensaje] = useState("");

    const abrirModal=(mensaje)=>{
      setAbierto(true);
      setMensaje(mensaje);
    }
  
      const abrirModalPuntuacion=()=>{
        setAbiertoPuntuacion(true);
      }
    
    const entregarPedido = ()=>
    {
      let infoViaje=
      {
        estado: "Entregado",
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
        tipo: "transportista",
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
  
          window.history.back();
        })
        .catch((e) => {
          console.log(e);
        })
    }

    const enviarPuntuacion = ()=>
    {
      if(puntuacion > 0 && puntuacion < 11)
      {
      let infoPuntuacion=
      {
        tipo: "transportista",
        idViaje: viajeInfos[0].idViaje,
        calificacion: puntuacion
      }
      const ViajeBody = Object.keys(infoPuntuacion).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(infoPuntuacion[key])).join('&');


      fetch("http://localhost:8080/ApiPPS/calificar/", {
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
      }
      else
      {
        setAbiertoPuntuacion(false);
        abrirModal("La puntuacion debe ser entre 1 y 10");
      }
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
              <div key={viajeInfo.idViaje} className="divOrigenDestinoAccion">
                    <h4>Origen del producto</h4>
                    <label className="labelInputs">Provincia:</label> 
                    <br></br> <input readOnly value={viajeInfo.DireccionOrigen.Provincia} align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label>
                    <br></br> <input readOnly value={viajeInfo.DireccionOrigen.Departamento} align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label>
                    <br></br> <input readOnly value={viajeInfo.DireccionOrigen.Ciudad} type="text"></input><br/>
                    <label className="labelInputs">CP: </label>
                    <br></br> <input readOnly align='right' value={viajeInfo.DireccionOrigen.CP} type="number" style={{width: '5vw'}}></input><br/>
                    <label className="labelInputs"> Calle:</label>
                    <br></br> <input  readOnly value={viajeInfo.DireccionOrigen.Calle} type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> 
                    <br></br><input readOnly value={viajeInfo.DireccionOrigen.Numeracion} type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label>
                    <br></br><input readOnly value={viajeInfo.DireccionOrigen.InfoExtra} type="text"></input> <br></br><br/>
                    </div>
                    ))}
                </Col>

                <Col xs={5} xl={3} md={5}>
                {viajeInfos.map((viajeInfo) => (
                    <div key={viajeInfo.idViaje} className="divOrigenDestinoAccion">
                    <h4>Destino del producto</h4>
                    <label className="labelInputs">Provincia:</label>  
                    <br></br> <input readOnly value={viajeInfo.DireccionLlegada.Provincia} align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label>
                    <br></br> <input readOnly value={viajeInfo.DireccionLlegada.Departamento} align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label>
                    <br></br>  <input readOnly value={viajeInfo.DireccionLlegada.Ciudad} type="text"></input><br/>
                    <label className="labelInputs">CP: </label>
                    <br></br>  <input readOnly value={viajeInfo.DireccionLlegada.CP} align='right' type="number" style={{width: '10vw', marginRight:'0px'}}></input><br/>
                    <label className="labelInputs"> Calle:</label> 
                    <br></br> <input readOnly value={viajeInfo.DireccionLlegada.Calle} type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> 
                    <br></br> <input readOnly value={viajeInfo.DireccionLlegada.Numeracion} type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label>
                    <br></br> <input readOnly value={viajeInfo.DireccionLlegada.InfoExtra} type="text"></input> <br/><br/>
                    </div>
                    ))}
                </Col>

                <Col xs={12} xl={6} md={12}>
                {viajeInfos.map((viajeInfo) => (
                    <div key={viajeInfo.idViaje} className="divContenedorDescripcionProductoAccion">
                    <h4>Producto/s a transportar</h4>
                    <label className="labelInputs">Cliente</label> 
                    <br></br> <input readOnly value={viajeInfo.infoCliente.email} align='right' type="text"></input><br/>
                    <label className="labelInputs">Precio acordado</label>
                    <br></br><input readOnly value={viajeInfo.infoPropuesta.Precio} align='right' type="text"></input><br/>
                    <label className="labelInputs">Puntuacion</label>
                    <br></br>  <input value={viajeInfo.infoCliente.calificacion} readOnly align='right' type="select"></input><br/>
                    <label className="labelInputs">Descripcion del pedido</label>  
                    <br/><input readOnly value={viajeInfo.infoPedido.descripcion} align='right' type="select"  style={{height:'10vh', width:'80%'}}>
                        </input><br/><br/>
                    </div>
                    ))}
                </Col>
                
                    <div className="centrarCol">
                  <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.history.back()}>
                      <label className="contenidoBotonCancelarAceptar">Atras</label>
                  </Button>
                  {viajeInfos.map((viajeInfo) => (
                    viajeInfo.estado == "Viaje Pactado"?
                  (<Button key={viajeInfo.idViaje} variant="contained" color="primary" className="botonAceptar" onClick={event=> entregarPedido()}>
                   {/* onClick={event => window.location.href = '/ClienteHome'}> */}
                      <label >Entregar Pedido</label>
                  </Button>):null
                  ))}
                  {viajeInfos.map((viajeInfo) => (
                    viajeInfo.estado == "Recibido" || viajeInfo.estado == "Calificado por Cliente"?
                  (<Button key={viajeInfo.idViaje} variant="contained" color="primary" className="botonAceptar" onClick={event=> abrirModalPuntuacion()}>
                      <label >Hacer encuesta</label>
                  </Button>):null
                  ))}
                  </div>
          </Row>

          {abierto &&    
           <div className="cartel" onClick={event =>  setAbierto(false)} >
            <h2>{mensaje}</h2>
            </div> 
         }

          {viajeInfos.map((viajeInfo) => (
          abiertoPun&&
           (<div className="puntuacion" key={viajeInfo.idViaje}>
            <h4 >Cliente</h4> <input readOnly value={viajeInfo.infoCliente.email} align='right' type="text"></input><br/>
            <h4>Puntuacion</h4> <input value={puntuacion} onChange = {(e) => setPuntuacion(e.target.value)} align='right' type="select"></input><br/>
            <br></br>
            <Button variant="contained" color="secondary"  onClick={event=> setAbiertoPuntuacion(false)}>
                <label >Cancelar</label>
            </Button>
            <Button variant="contained" color="primary" onClick={event=> enviarPuntuacion()}>
            <label >Enviar puntuacion</label>
            </Button>
            </div> 
            )
          ))}

      </Grid>
      </>)
}