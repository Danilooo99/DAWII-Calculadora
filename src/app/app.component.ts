import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = "DAW II - Calculadora.";
  autor = "Realizada por Danilo Rivero Pérez";
  pantalla="0";
  resultado="";
  control=false;
  error=false;
  porciento=0;

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
        if(this.pantalla[i]==="*" || this.pantalla[i]==="+" || this.pantalla[i]==="-" || this.pantalla[i]==="/" || this.pantalla[i]==="%") {
          if(this.pantalla[i] === this.pantalla[i+1]) {
            this.error=true;
          }
        }
      }
    }

  }

  resultadoOperacion():void {
    if(this.error){
      this.pantalla="Syntax Error";
      this.error=false;
    } else {
      this.control=true;
      //alert(this.pantalla.concat(this.porciento.toString()));
      this.resultado = eval(this.pantalla/*.concat(this.porciento.toString())*/);
      this.pantalla = this.resultado;
    }
  }

  /*porcentaje():void {
    this.pantalla+="%";
    for(var i=0;i<this.pantalla.length;i++){
      if(this.pantalla[i] === "%") {
        this.porciento = Number(this.pantalla[i-1])/100;
        //this.pantalla += this.porciento.toString();
        break;
      }
    }
  }
*/
  resetear():void {
    this.pantalla = "0";
  }
  
}
