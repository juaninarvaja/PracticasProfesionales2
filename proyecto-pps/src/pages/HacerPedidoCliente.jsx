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


    const subirPedido = (e)=>
    {

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

        //window.location.href = '/ClienteHome';
      })
      .catch((e) => {
        console.log(e);
      })
    }

    return (
        <div className="TransportistaHome">
            <h1>Cargar los detalles del producto a enviar</h1>
            <Grid>
                <Row>
                <Col xs={5} xl={3} md={5}>
                    <div className="divOrigenDestino">
                        <h4>Origen del producto</h4>
                        <label className="labelInputs">Provincia:</label>  <input value={provinciaOrigen} onChange = {(e) => setProvinciaOrigen(e.target.value)}  align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label><input value={departamentoOrigen} onChange = {(e) => setDepartamentoOrigen(e.target.value)} align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label> <input value={ciudadOrigen} onChange = {(e) => setCiudadOrigen(e.target.value)}  type="text"></input><br/>
                    <label className="labelInputs">CP: </label> <input align='right' value={codigoPostalOrigen} onChange = {(e) => setCodigoPostalOrigen(e.target.value)} type="number" style={{width: '5vw'}}></input><br/>
                    <label className="labelInputs"> Calle:</label> <input value={calleOrigen} onChange = {(e) => setCalleOrigen(e.target.value)} type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> <input value={numeracionOrigen} onChange = {(e) => setNumeracionOrigen(e.target.value)} type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label><input value={infoOrigen} onChange = {(e) => setInfoOrigen(e.target.value)} type="text"></input> <br></br><br/>
                    <label className="labelInputsCargaDescarga">El transportista debera
                     hacerse cargo de la carga del producto en su vehiculo?
                     <input className="CheckBox" type="checkbox"></input></label>
                    </div>
                </Col>

                <Col xs={5} xl={3} md={5}>
                    <div className="divOrigenDestino">
                    <h4>Destino del producto</h4>
                    <label className="labelInputs">Provincia:</label>  <input value={provinciaDestino} onChange = {(e) => setProvinciaDestino(e.target.value)} align='right' type="text"></input><br/>
                    <label className="labelInputs">Municipio:</label><input value={departamentoDestino} onChange = {(e) => setDepartamentoDestino(e.target.value)} align='right' type="text"></input> <br/>
                    <label className="labelInputs">Localidad: </label> <input value={ciudadDestino} onChange = {(e) => setCiudadDestino(e.target.value)} type="text"></input><br/>
                    <label className="labelInputs">CP: </label> <input value={codigoPostalDestino} onChange = {(e) => setCodigoPostalDestino(e.target.value)} align='right' type="number" style={{width: '10vw', marginRight:'0px'}}></input><br/>
                    <label className="labelInputs"> Calle:</label> <input value={calleDestino} onChange = {(e) => setCalleDestino(e.target.value)} type="text"></input><br/>
                    <label className="labelInputs">Altura:</label> <input value={numeracionDestino} onChange = {(e) => setNumeracionDestino(e.target.value)} type="number"></input><br/>
                    <label className="labelInputs">Info extra:</label><input value={infoDestino} onChange = {(e) => setInfoDestino(e.target.value)} type="text"></input> <br/><br/>
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
                    <br/><input value={descripcion} onChange = {(e) => setDescripcion(e.target.value)} align='right' type="select"  style={{height:'10vh', width:'80%'}}>
                        </input><br/><br/>
                        <Button variant="contained" color="primary" className="botonAceptar" onClick={subirPedido}>
                            <label className="contenidoBotonCancelarAceptar">Cargar Pedido</label>
                        </Button>
                        <Button variant="contained" color="secondary" className="botonCancelar" onClick={event => window.history.back()}>
                            <label className="contenidoBotonCancelarAceptar">Cancelar</label>
                        </Button>
                    </div>
                </Col>
                </Row>
              
            </Grid>
        </div>
    );
}