import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'aluno-informacao',
  templateUrl: './aluno-informacao.component.html',
  styleUrls: ['./aluno-informacao.component.css']
})
export class AlunoInformacaoComponent implements OnInit {

  aluno = {} as any
  autenticado: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alunoService: AlunoService) {
    this.autenticado = authService.isAutenticado();
  }

  ngOnInit(): void {
    this.alunoService.getUser().subscribe(aluno => {
      this.aluno = aluno;
    })
  }

  irParaRota(rota: string) {
    this.router.navigateByUrl(rota, { skipLocationChange: true });
  }

  deslogar() {
    this.authService.deslogar();
    this.alunoService.setUser(null);
    this.autenticado = this.authService.isAutenticado();
    this.irParaRota('/');
  }

}
