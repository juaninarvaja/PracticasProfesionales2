import { render } from '@testing-library/react';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './cabecera.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function TusViajes(props) {


  let [infoViajes, setInfoViajes] = useState([]);
  let [idPedidos, setIdsPedidos] = useState([]);
  //let [JsonArray, setJsonArray] = useState({});
  let [flag, setFlag] = useState(true);
  var JsonArray = {};

  useEffect(() => {
    //     idPedidos = [];
    //     // infoViajes = [];
    //     var arrayIdPedidos = [];
    //     // console.log(props.pedidosCliente);
    //     //localhost:8080/ApiPPS/viaje/traerPorIdPedido

    //recorro el map y llamo a esta funcion cada vez
    async function funcionAsync() {


      await props.pedidosCliente.filter(pedido => pedido.estado != "POSTEADO").map((row) => {
        //setIdsPedidos(idPedidos => [idPedidos,row.idPedido]);
        idPedidos.push(row.idPedido);
      });
      for (let i = 0; i < idPedidos.length; i++) {
        console.log(idPedidos.length);
        let infoViaje =
        {
          idPedido: idPedidos[i]
        }
        const ViajeBody = Object.keys(infoViaje).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(infoViaje[key])).join('&');
        let viajeAux = await fetch("http://localhost:8080/ApiPPS/viaje/traerPorIdPedido", {
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
          body: ViajeBody,
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (resp) {
            //infoViajes = infoViajes + resp;
            //console.log(resp);
            //infoViajes.push(resp);
            return resp;

            //setInfoViajes(JSON.stringify(resp));
            //console.log(infoViajes);
            //window.location.href = '/ClienteHome';
          })
          .catch((e) => {
            console.log(e);
          })
        // let auxString = JSON.stringify(viajeAux);
        // auxString = auxString.replace('[','');
        // auxString = auxString.replace(']','');

        setInfoViajes(infoViajes => [...infoViajes, viajeAux]);
      }

      //   console.log(idPedidos);
      //  // JsonArray= JSON.stringify(infoViajes);
      //  console.log(infoViajes);
    }
    funcionAsync();
  }, [props]);



  return ( // <>  </>
    <div>
      {/* className="contenedor" onClick={event =>  window.location.href='/Home'} > */}
      {/* <h2>Estos son tus viajes</h2> */}
      {/* <h3 className="title">Estos son tus viajes </h3>
      <h4>Estos son tus idPedidos q son viajes {idPedidos.length}</h4>
      <h4>Estos son tus viajes {infoViajes.length}</h4> */}
      {/* {JSON.stringify(infoViajes)} */}
      <h3 className ="title">Tus Viajes</h3>
      {/* {console.log(infoViajes)} */}
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead >
          <TableRow className="cabeceraTable">
            <TableCell>Pedido</TableCell>
            <TableCell align="right">Transportista</TableCell>
            <TableCell align="right">Costo</TableCell>
            <TableCell align="right">Informacion</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            infoViajes.map((viaje) => {
              {console.log(viaje)}
              return <>
              
                <TableRow key = {viaje[0].idViaje}>
                  <TableCell component="th" scope="row">{viaje[0]?.infoPedido?.descripcion}</TableCell>
                  <TableCell align="right">{viaje[0]?.infoPropuesta?.infoTransp?.email}</TableCell>
                  <TableCell align="right">{viaje[0]?.infoPropuesta?.Precio}</TableCell>
                  <TableCell align="right">{viaje[0]?.infoPropuesta?.informacion}</TableCell>
                  <TableCell align="right">{viaje[0]?.estado}</TableCell>

                </TableRow>
              </>


            })
          }
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}

//export default TusViajes;
