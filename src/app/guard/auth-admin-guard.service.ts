import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService {

  constructor(private router: Router, private authService: AuthService, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const permissao = new Promise<boolean>((resolve, reject) => {
      this.loginService.checkLoginAdmin().subscribe((response)=>{
        this.authService.setAdmin(response);
        resolve(true)
      }, ()=>{
        this.authService.deslogarAdmin();
        this.router.navigateByUrl('/admin/login');
        resolve(false)
      })
    });

    return permissao;
  }
}
