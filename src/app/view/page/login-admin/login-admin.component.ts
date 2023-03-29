import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  login = {
    email: '',
    senha: ''
  }

  errorMensagem = '';

  constructor(private router: Router, private authService: AuthService, private loginService: LoginService, private alunoService:AlunoService) { }

  ngOnInit(): void {
  }

  fazerLogin(form:any){
    this.loginService.adminLogin(this.login).subscribe((response:any)=>{
      this.authService.setAdmin(response);
      this.alunoService.setUser(response)
      this.router.navigateByUrl('/admin/dashboard');
    }, (error)=>{
      if(error.status == 401)
        this.errorMensagem = 'Usuário e/ou senha inválido!'
      if(error.status == 403)
        this.errorMensagem = 'Conta não autorizada, fale com o responsavel pelo sistema!'
    })
  }

}
