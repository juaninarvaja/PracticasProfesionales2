import React, {useCallback,  useEffect, useState } from 'react';
import {  Grid ,  Row ,  Col  } from 'react-flexbox-grid' ; 
import './mensaje.css'

function MensajeError(props) {
    console.log("entro a la clase" + props.mensaje);
    let [abierto, setAbierto] = useState(props.abierto);
  return (
      <>
       {abierto && 
    <div className="cartel" onClick={event =>  setAbierto(false)} >
        <h2>{props.mensaje}</h2>
      </div> }
      </>
  );
}

export default MensajeError;
