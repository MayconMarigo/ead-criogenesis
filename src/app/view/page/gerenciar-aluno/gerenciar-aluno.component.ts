import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gerenciar-aluno',
  templateUrl: './gerenciar-aluno.component.html',
  styleUrls: ['./gerenciar-aluno.component.css']
})
export class GerenciarAlunoComponent implements OnInit {

  listaAlunos = ['Carlos Alberto', 'Renato Aragão', 'Eduardo Costa', 'Roberta Marinho', 'Celeste Azul', 'Margarida Amarela']

  constructor() { }

  ngOnInit(): void {
  }

}
