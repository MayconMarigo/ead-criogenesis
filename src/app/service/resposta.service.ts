import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RespostaService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAnswers(id: any, isAdmin?: boolean) {
    const formData: FormData = new FormData();
    formData?.append('token', this.authService.getToken(isAdmin));
    formData?.append('id', JSON.stringify(id));
    return this.http.post(environment.apiUrl + 'admin/answers', formData);
  }
  getTests(isAdmin?: boolean) {
    const formData: FormData = new FormData();
    formData?.append('token', this.authService.getToken(isAdmin));
    return this.http.post(environment.apiUrl + 'admin/tests', formData);
  }
}
