import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ejercicio con Texto';
  text1="1";
  text2="2";
  concat="X";

  concatenate():void{
    this.concat=this.text1+this.text2;
  }
}
