import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gerenciar-professor',
  templateUrl: './gerenciar-professor.component.html',
  styleUrls: ['./gerenciar-professor.component.css']
})
export class GerenciarProfessorComponent implements OnInit {

  listaProfessores = ['Carlos Alberto', 'Renato Aragão', 'Eduardo Costa', 'Roberta Marinho', 'Celeste Azul', 'Margarida Amarela']

  constructor() { }

  ngOnInit(): void {
  }

}
