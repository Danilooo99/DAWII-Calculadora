import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  
  // Variables del componente principal de la aplicación.
  pantalla="0";
  resultado="";
  control=false;
  error=false;
  
  // Función que evita determinados casos de excepción y muestra las operaciones tecleadas en la pantalla de la calculadora.
  operacion(numero:string):void {
    if(this.pantalla === "0" || this.pantalla === "Syntax Error"){
      this.pantalla="";
    } 
    if(this.control){
      if(this.pantalla!=="0"){
        this.pantalla="";
      }
    }
    this.control=false;
    this.pantalla += numero;
    for(var i=0;i<this.pantalla.length;i++){
      if(this.pantalla.charAt(0)==="*" || this.pantalla.charAt(0)==="+" || this.pantalla.charAt(0)==="/" || this.pantalla.charAt(0)==="%") {
        this.pantalla="0";
        break;
      } else {
        if(this.pantalla[i]==="*" || this.pantalla[i]==="+" || this.pantalla[i]==="-" || this.pantalla[i]==="/") {
          if(this.pantalla[i+1] === "*" || this.pantalla[i+1] === "+" || this.pantalla[i+1] === "-" || this.pantalla[i+1] === "/") {
            this.error=true;
          }
        }
        if(this.pantalla[i]==="%") {
          if(this.pantalla[i+1]==="%") {
            this.error=true;
          }
        }
      }
    }
  }

  // Función que calcula la operación aritmética mostrada en la calculadora tras pulsar la tecla igual ('=').
  resultadoOperacion():void {
    if(this.pantalla[this.pantalla.length-1]==="*" || this.pantalla[this.pantalla.length-1]==="-" ||this.pantalla[this.pantalla.length-1]==="+" ||this.pantalla[this.pantalla.length-1]==="/"){
      this.error=true;
    }
    if(this.error){
      this.syntaxError();
    } else {
      this.control=true;
      if(this.pantalla.includes("%")){
        let serializado = this.serializarPorcentaje();
        let resultadoFinal = this.calculoPorcentaje(serializado);
        this.resultado = eval(resultadoFinal);
        this.pantalla = this.resultado;
      } else {
        this.resultado = eval(this.pantalla);
        this.pantalla = this.resultado;
      }
    }
  }

  // Función que prepara la operación de la pantalla de la calculadora para realizar la operación de porcentaje ('%').
  calculoPorcentaje(pantalla:string):string {
    let cambio = pantalla.replace(/[%]/gi,'/100');
    if(cambio[cambio.length-1] === "%" || cambio[cambio.length-1] === "+" || cambio[cambio.length-1] === "-" || cambio[cambio.length-1] === "/"){
      this.syntaxError(); 
    }
    if(cambio[cambio.length-1] === "*"){
      cambio = cambio.substring(0,cambio.length - 1);
    }
    return cambio;
  }

  // Función que renderiza la operación de porcentaje.
  serializarPorcentaje():string {
    var cadena = "";
    for(var i=0;i<this.pantalla.length;i++){
      if(this.pantalla[i] ==="%"){
        if(this.pantalla[i+1] !== "+" && this.pantalla[i+1] !== "-" && this.pantalla[i+1] !== "*" && this.pantalla[i+1] !== "/" && this.pantalla[i+1] !== "%") {
          cadena += this.pantalla[i] + "*";
        } else {
          cadena += this.pantalla[i]; 
        }
      } else {
        cadena += this.pantalla[i];
      }
    }
    return cadena;
  }
  
  // Función que resetea la pantalla de la calculadora al pulsar la tecla "C"
  resetear():void {
    this.pantalla = "0";
  }

  // Función que muestra un error de sintaxis en la pantalla de la calculadora.
  syntaxError():void {
    this.pantalla="Syntax Error";
    this.error=false;
  }

  // Función que borra los datos de la pantalla de la calculadora.
  borrar():void {
    if(this.pantalla === "Syntax Error"){
      this.pantalla = "0";
    }
    if(this.pantalla.length === 1){
      this.pantalla="0";
    }
    if(this.pantalla !== "0"){
      let borrado = this.pantalla.substring(0, this.pantalla.length-1);
      this.pantalla = borrado;
    }
  }
  
}
