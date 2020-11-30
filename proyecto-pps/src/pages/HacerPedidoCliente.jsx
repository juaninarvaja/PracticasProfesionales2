import React, {useCallback,  useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HacerPedidoCliente.css'
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';


export default function HacerPedidoCliente()
{
    let { id } = useParams(); 

    let [calleOrigen, setCalleOrigen] = useState("");
    let [ciudadOrigen, setCiudadOrigen] = useState("");
    let [departamentoOrigen, setDepartamentoOrigen] = useState("");
    let [provinciaOrigen, setProvinciaOrigen] = useState("");
    let [codigoPostalOrigen, setCodigoPostalOrigen] = useState("");
    let [numeracionOrigen, setNumeracionOrigen] = useState("");
    let [infoOrigen, setInfoOrigen] = useState("");

    let [calleDestino, setCalleDestino] = useState("");
    let [ciudadDestino, setCiudadDestino] = useState("");
    let [departamentoDestino, setDepartamentoDestino] = useState("");
    let [provinciaDestino, setProvinciaDestino] = useState("");
    let [codigoPostalDestino, setCodigoPostalDestino] = useState("");
    let [numeracionDestino, setNumeracionDestino] = useState("");
    let [infoDestino, setInfoDestino] = useState("");

    //let [distancia, setDistancia] = useState("");
    let [descripcion, setDescripcion] = useState("");

    let [abierto, setAbierto] = useState(false);
    let [mensaje, setMensaje] = useState("");
  
      const abrirModal=(mensaje)=>{
        setAbierto(true);
        setMensaje(mensaje);
      }

    const subirPedido = (e)=>
    {
        if(!calleOrigen ||!ciudadOrigen || !departamentoOrigen || !provinciaOrigen || !codigoPostalOrigen || !numeracionOrigen 
            || !infoOrigen || !calleDestino ||!ciudadDestino || !departamentoDestino || !provinciaDestino || !codigoPostalDestino || !numeracionDestino 
            || !infoDestino || !descripcion  ){
                abrirModal("Falta informacion para poder realizar el pedido, le solicitamos que complete todos los campos con asterisco para poder continuar con la realización de su pedido");
            //console.log("mandame toda la info o no pasas");
        }
        else{
            console.log(typeof(calleOrigen));
            let datos=
            {
              idCliente: id,
              calleOrigen: calleOrigen,
              ciudadOrigen: ciudadOrigen,
              departamentoOrigen: departamentoOrigen,
              provinciaOrigen: provinciaOrigen,
              codigoPostalOrigen: codigoPostalOrigen,
              numeracionOrigen: numeracionOrigen,
              infoOrigen: infoOrigen,
              calleDestino: calleDestino,
              ciudadDestino: ciudadDestino,
              departamentoDestino: departamentoDestino,
              provinciaDestino: provinciaDestino,
              codigoPostalDestino: codigoPostalDestino,
              numeracionDestino: numeracionDestino,
              infoDestino: infoDestino,
              distancia: 147,
              descripcion: descripcion
            }
    
        const formBody = Object.keys(datos).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(datos[key])).join('&');
            console.log(formBody);
            
        fetch("http://localhost:8080/ApiPPS/pedidos/", {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          body: formBody,
          })
          .then(function (response) {
            return response.json();
          })
          .then(function (resp) {
            console.log(resp);
            window.history.back();
            //window.location.href = '/ClienteHome';
          })
          .catch((e) => {
            console.log(e);
          })
          
        }
       
    }

    return (
        <div className="TransportistaHome">
            <h1>Cargar los detalles del producto a enviar</h1>
            <Grid>
                <Row>
                <Col xs={5} xl={3} md={5}>
                    <div className="divOrigenDestino">
                        <h4>Origen del producto</h4>

              <input placeholder="*Provincia" value={provinciaOrigen} onChange = {(e) => setProvinciaOrigen(e.target.value)}  type="text" ></input><br/>
           
                    <input  placeholder="*Municipio" value={departamentoOrigen} onChange = {(e) => setDepartamentoOrigen(e.target.value)}  type="text"></input> <br/>
 
                    <input  placeholder="*Localidad" value={ciudadOrigen} onChange = {(e) => setCiudadOrigen(e.target.value)}  type="text"></input><br/>
            
                     <input  placeholder="*CP" align='right' value={codigoPostalOrigen} onChange = {(e) => setCodigoPostalOrigen(e.target.value)} type="number" style={{width: '5vw'}}></input><br/>
                 
                     <input  placeholder="*Calle" value={calleOrigen} onChange = {(e) => setCalleOrigen(e.target.value)} type="text" ></input><br/>
       
                     <input placeholder="*Altura" value={numeracionOrigen} onChange = {(e) => setNumeracionOrigen(e.target.value)}  type="number"></input><br/>
             
                    <input  placeholder="*Info extra" value={infoOrigen} onChange = {(e) => setInfoOrigen(e.target.value)} type="text" ></input> <br></br><br/>
                    <label className="labelInputsCargaDescarga">El transportista debera
                     hacerse cargo de la carga del producto en su vehiculo?
                     <input className="CheckBox" type="checkbox"></input></label>
                    </div>
                </Col>

                <Col xs={5} xl={3} md={5}>
                    <div className="divOrigenDestino">
                    <h4>Destino del producto</h4>
                     <input placeholder="*Provincia" value={provinciaDestino} onChange = {(e) => setProvinciaDestino(e.target.value)} align='right' type="text"></input><br/>
                    <input  placeholder="*Municipio" value={departamentoDestino} onChange = {(e) => setDepartamentoDestino(e.target.value)} align='right' type="text"></input> <br/>
                    <input  placeholder="*Localidad"  value={ciudadDestino} onChange = {(e) => setCiudadDestino(e.target.value)} type="text"></input><br/>
                    <input placeholder="*CP"  value={codigoPostalDestino} onChange = {(e) => setCodigoPostalDestino(e.target.value)} align='right' type="number" style={{width: '10vw', marginRight:'0px'}}></input><br/>
                     <input placeholder="*Calle" value={calleDestino} onChange = {(e) => setCalleDestino(e.target.value)} type="text"></input><br/>
                     <input  placeholder="*Altura" value={numeracionDestino} onChange = {(e) => setNumeracionDestino(e.target.value)} type="number"></input><br/>
                  <input placeholder="*Info extra"  value={infoDestino} onChange = {(e) => setInfoDestino(e.target.value)} type="text"></input> <br/><br/>
                    <label className="labelInputsCargaDescarga">El transportista debera
                     hacerse cargo de la descarga del producto en su vehiculo?
                     <input className="CheckBox" type="checkbox"></input></label>
                    
                    </div>
                </Col>

                <Col xs={10} xl={6} md={10}>
                    <div className="divContenedorDescripcionProducto">
                    <h4>Producto/s a transportar</h4>
                    {/* <label className="labelInputs">Tipo de producto</label>  <input align='right' type="text"></input><br/>
                    <label className="labelInputs">Transporte apto p/llevar</label><input align='right' type="text"></input><br/>
                    <label className="labelInputs">Medidas</label>  <input align='right' type="select"></input><br/>
                    <label className="labelInputs">*Descripcion del pedido</label>   */}
                    <br/><input placeholder="Descripcion del pedido a realizar..."  value={descripcion} onChange = {(e) => setDescripcion(e.target.value)} align='right' type="select"  style={{height:'15vh', width:'80%'}}>
                        </input><br/><br/>

                        <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.history.back()}>
                            <label className="contenidoBotonCancelarAceptar">Cancelar</label>
                        </Button>
                        <Button variant="contained" color="primary" className="botonAceptar" onClick={subirPedido}>
                            <label className="contenidoBotonCancelarAceptar">Cargar Pedido</label>
                        </Button>
                    </div>
                </Col>
                </Row>
         

        
            </Grid>
            {abierto &&    
           <div className="cartel" onClick={event =>  setAbierto(false)} >
            <h2>{mensaje}</h2>
            </div> 
         }
            
        </div>
    );
}