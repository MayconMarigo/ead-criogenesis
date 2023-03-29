import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  buscar: string = '';
  imageSrc: string = '././assets/logo.PNG';
  user: any = {} as any

  autenticado: boolean = false;
  dropdown: boolean = false;
  permission: any;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alunoService: AlunoService) {
    const pathSplitted = this.router.url.split('/');
    this.isAdmin = pathSplitted[1] == 'admin';
    this.user = {};
    if (this.isAdmin) {
      this.user = authService.getUser(this.isAdmin);
    } else {
      this.alunoService.getUser().subscribe(aluno => {
        this.user = aluno;
      }, (_)=>{
        this.user = this.authService.getUser();
      })
    }
    this.autenticado = authService.isAutenticado(this.isAdmin);
  }

  ngOnInit(): void {
  }

  abrirDropdown() {
    this.dropdown = !this.dropdown;
  }
  fecharDropdown() {
    this.dropdown = false;
  }

  // isInicioRota(){
  //   const url = this.router.parseUrl(this.router.url);
  //   return url.root.numberOfChildren == 0;
  // }

  irParaRota(rota: string) {
    this.router.navigateByUrl(rota);
    this.fecharDropdown();
  }

  deslogar() {
    this.isAdmin ? this.authService.deslogarAdmin() : this.authService.deslogar();
    this.alunoService.setUser(null);
    this.autenticado = this.authService.isAutenticado();
    this.irParaRota('/');
  }

}
