import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPayments(){
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl+'payments', formData);
  }
  postPayments(data: any){
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('data', JSON.stringify(data));
    return this.http.post(environment.apiUrl+'payments', formData);
  }
}
