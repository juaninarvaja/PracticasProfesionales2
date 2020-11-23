import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cabecera from './componentes/cabecera';
import ClienteHome from './pages/ClienteHome';
import TransportistaHome from './pages/TransportistaHome';
import Login from './pages/Login';
import VentanaOferta from './pages/VentanaOferta';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import HacerPedidoCliente from './pages/HacerPedidoCliente';
import AdministradorHome from './pages/AdministradorHome';
import Registro from './pages/Registro';
import ConfirmarCotizacionRecibida from './pages/ConfirmarCotizacionRecibida';
import CotizacionesPorTta from './pages/CotizacionesPorTta';
import CotizacionesPedido from './pages/CotizacionesPedido';

function App() {
  return (
    <div className="App">
      <header>
      <Cabecera/>
      </header>
      <Router>
        <Switch> 
          {/* si pongo / sola sin el exact va aentrar siempre ahi */}
          <Route exact path='/'> 
            <Home/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path='/ClienteHome/:email'>
            <ClienteHome/>
          </Route>
          <Route path='/TransportistaHome/:email'>
           <TransportistaHome/>
          </Route>
          <Route path='/Login'>
           <Login/>
          </Route>
          <Route path='/HacerPedidoCliente/:id'>
           <HacerPedidoCliente/>
          </Route>
          <Route path='/VentanaOferta/:idTransp/:idPedido'>
           <VentanaOferta/>
          </Route>
          <Route path='/AdministradorHome'>
           <AdministradorHome/>
          </Route>
          <Route path='/Registro'>
           <Registro/>
          </Route>
          <Route path='/CotizacionesPedido/:id'>
           <CotizacionesPedido/>
          </Route>
          <Route path='/ConfirmarCotizacion/:id'>
            <ConfirmarCotizacionRecibida/>
          </Route>
          <Route path='/CotizacionesPorTta/:email'>
            <CotizacionesPorTta/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
