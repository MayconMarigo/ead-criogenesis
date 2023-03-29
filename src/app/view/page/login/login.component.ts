import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  autenticado: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.autenticado = this.isAdminRoute() ? this.authService.isAutenticado(true) : this.authService.isAutenticado();
    if (this.autenticado)
      this.isAdminRoute() ? this.router.navigateByUrl('/admin/dashboard') : this.router.navigateByUrl('/');
  }

  isAdminRoute() {
    return this.router.url.substring(1, this.router.url.length).split('/')[0] == 'admin';
  }
}
