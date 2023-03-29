import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of, Observable } from 'rxjs';
import { AlunoService } from '../service/aluno.service';
import { AuthService } from '../service/auth.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private loginService: LoginService, private alunoService: AlunoService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const permissao = new Promise<boolean>((resolve, reject) => {
        this.loginService.checkLogin().subscribe((response) => {
          this.authService.setUser(response);
          this.alunoService.setUser(response);
          resolve(true)
        }, () => {
          this.authService.deslogar();
          this.alunoService.setUser(null);
          this.router.navigateByUrl('/login');
          resolve(false)
        })
    });

    return permissao;
  }


}
