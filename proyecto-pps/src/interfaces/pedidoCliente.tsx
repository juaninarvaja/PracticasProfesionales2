import Direccion from "./direccion";

export default interface PedidoCliente {
    idPedido:number;
    idCliente:number;
    direccionOrigen : Direccion;
    cargaCargoTransoprtista:boolean;
    direccionDestino : Direccion;
    descargaCargoTransportista: boolean;
    tipoProducto : string;
    tranporteApto: TransporteApto
    medidas:String;
    descripcion:String;
    
  }
   
  enum TransporteApto {
      camion, camioneta, utilitario, vehiculoRefrigerado
  }
  