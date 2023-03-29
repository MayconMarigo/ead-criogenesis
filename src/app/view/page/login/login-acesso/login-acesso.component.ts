import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';
import { DialogService } from 'src/app/service/dialog.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'login-acesso',
  templateUrl: './login-acesso.component.html',
  styleUrls: ['./login-acesso.component.css']
})
export class LoginAcessoComponent implements OnInit {

  login = {
    email: '',
    senha: ''
  }

  errorMensagem = '';

  constructor(private router: Router, private authService: AuthService, private loginService: LoginService, private dialogService: DialogService, private alunoService:AlunoService) { }

  ngOnInit(): void {
  }

  fazerLogin(form:any){
    this.loginService.login(this.login).subscribe((response:any)=>{
      this.authService.setUser(response);
      this.alunoService.setUser(response);
      this.router.navigate(['']);
    },(error)=>{
      if(error.status == 401)
        this.errorMensagem = 'Usuário e/ou senha inválido!'
      if(error.status == 403)
        this.errorMensagem = 'Conta está em análise, aguarde mais um pouco!'
    })
  }

  recuperarSenha(){
    this.dialogService.recuperarSenhaDialog().afterClosed().subscribe((response)=>{});
  }
}
