import { Component, OnInit } from '@angular/core';
import { ToolsUtils } from 'src/app/model/tools';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'cursos-ativos',
  templateUrl: './cursos-ativos.component.html',
  styleUrls: ['./cursos-ativos.component.css']
})
export class CursosAtivosComponent extends ToolsUtils implements OnInit {
  listaCursos = [] as any;
  constructor(private cursoService: CursoService) { super(); }

  ngOnInit(): void {
    this.carregarCursosAtivos();
  }

  carregarCursosAtivos(){
    this.cursoService.coursesAdmin().subscribe((response:any)=>{
      this.listaCursos = response;
    })
  }

  retonarScore(curso:any, type: string) {
    const reviewFiltrada: [] = curso?.reviews?.filter((e: any) => e.type == type);
    if (reviewFiltrada && reviewFiltrada.length > 0)
      return reviewFiltrada.map((e: any) => e.score)[0];
    return 0;
  }
}
