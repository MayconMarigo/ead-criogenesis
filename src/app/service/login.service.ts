import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  register(data: any) {
    const formData: FormData = new FormData();
    formData.append('data', JSON.stringify(data));
    return this.http.post(environment.apiUrl + 'register', formData);
  }

  login(data: any) {
    const formData: FormData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.senha);
    return this.http.post(environment.apiUrl + 'login', formData);
  }

  adminLogin(data: any) {
    const formData: FormData = new FormData();
    formData.append('user', data.email);
    formData.append('password', data.senha);
    return this.http.post(environment.apiUrl + 'admin/login', formData);
  }

  checkLogin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'checkLogin', formData);
  }
  checkLoginAdmin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/checkLogin', formData);
  }
  restorePassword(code: string, password: string) {
    const formData: FormData = new FormData();
    formData.append('code', code);
    formData.append('password', password);
    return this.http.post(environment.apiUrl + 'password/new', formData);
  }
  requestCode(email: string) {
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.http.post(environment.apiUrl + 'password/code', formData);
  }
}
