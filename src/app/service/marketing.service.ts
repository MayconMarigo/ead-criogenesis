import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMarketingAdmin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/marketing', formData);
  }
  getMarketing() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'marketing', formData);
  }
  getMarketingById(id:string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/marketing/'+id, formData);
  }
  deleteMarketing(id: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('id', id);
    return this.http.post(environment.apiUrl + 'admin/marketing/del', formData);
  }
  setMarketing(id: string, data: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('id', id);
    formData.append('data', JSON.stringify(data));
    return this.http.post(environment.apiUrl + 'admin/marketing/set', formData);
  }
  addMarketing(data: any, file?: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('data', JSON.stringify(data));
    formData.append('file', file);
    return this.http.post(environment.apiUrl + 'admin/marketing/add', formData);
  }
}
