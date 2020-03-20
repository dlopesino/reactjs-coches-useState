import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";

import './Car.css';

export default function Car() {
// la forma en la que ahora se utiliza el state para actualizar el componente (sustituye a didmount)
  const [isStarted, setStarted] = useState(false);
  const [countKm, setCountKm] = useState(0);

  useEffect(() => { // sustituye a willMount, didupdate y didmount
    //actua cuando el componente se termina de renderizar
   let titulo = isStarted ? 'Encendido' : 'Apagado';
    document.title = `Coche ${titulo}`; 

  }, [ isStarted ]);// las variables a comprobar se añaden a un array

  let estado = "";
  let aceleracion;

  const power = () => {
    setStarted(!isStarted);
    
    if (isStarted) {
        setCountKm(0);
    }
  }

  const checkStartedCar = () => {
    if (isStarted) {
      estado = "Apagar";
      return <span style={{ color: "green " }}>Encendido</span>;
    } else {
      estado = "Encender";
      return <span style={{ color: "red " }}>Apagado</span>;
    }
  };

  const acelerar = () => {
    if (isStarted) {
      aceleracion = countKm + 5;
      setCountKm(aceleracion);
    }
  };

  const frenar = () => {
    if (countKm > 0 && isStarted) {
      aceleracion = countKm - 5;
      setCountKm(aceleracion);
    }
  };

  const kmsHora = () => {

    if(!isStarted){
        return (      
            <div className="col-md-6 col-md-offset-3 velocidad parado">
                { countKm } Kms/Hora
            </div>
          );
    } else {
      if (countKm > 120) {
        return (      
            <div className="col-md-6 col-md-offset-3 velocidad valta">
                { countKm } Kms/Hora
            </div>
          );
      } else if (countKm > 90 && countKm <= 120 ) {
        return (      
            <div className="col-md-6 col-md-offset-3 velocidad vmedia"> 
                { countKm } Kms/Hora
            </div>
          );
      } else {
        return (
            <div className="col-md-6 col-md-offset-3 velocidad vnormal">  
                { countKm } Kms/Hora
            </div>
          );
      }
    }
  }

  return (
    <div>
      <h3>Nuestro coche está: { checkStartedCar() } </h3>
     
      <Button variant="outline-dark" onClick={() => power() }>
        {estado}
      </Button>
      <Button variant="outline-success" onClick={() => acelerar() }>
        Acelerar
      </Button>
      <Button variant="outline-warning" onClick={() => frenar() }>
        Frenar
      </Button>

      <div className="row kms">
        { kmsHora() }
      </div>
    </div>
  );
}
