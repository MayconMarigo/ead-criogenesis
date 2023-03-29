import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gerenciar-administrador',
  templateUrl: './gerenciar-administrador.component.html',
  styleUrls: ['./gerenciar-administrador.component.css']
})
export class GerenciarAdministradorComponent implements OnInit {

  listaAdministradores = ['Carlos Alberto', 'Renato Aragão', 'Eduardo Costa', 'Roberta Marinho', 'Celeste Azul', 'Margarida Amarela']

  constructor() { }

  ngOnInit(): void {
  }

}
