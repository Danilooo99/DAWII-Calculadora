import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  titulo = "DAW II - Calculadora.";
  autor = "Realizada por Danilo Rivero Pérez";

  constructor() { }

  ngOnInit(): void {
  }

}
