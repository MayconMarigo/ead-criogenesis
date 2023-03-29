import { Component, OnInit } from '@angular/core';
import { ToolsUtils } from 'src/app/model/tools';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends ToolsUtils implements OnInit {

  meusCursos: any = [];

  constructor(private cursoService: CursoService) { super(); }

  ngOnInit(): void {
    this.carregarCursos();
  }

  carregarCursos(){
    this.cursoService.courses().subscribe((response)=>{
      this.meusCursos = response;
    });
  }

}
