import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private userData = new BehaviorSubject<any>(undefined);

  setUser(user: any): void {
    this.userData.next(user);
  }

  getUser(): Observable<any> {
    return this.userData.asObservable();
  }

  saveFullRegister(data: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('data', JSON.stringify(data));
    return this.http.post(environment.apiUrl + 'fullRegister', formData);
  }
  getFullRegister() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'fullRegister', formData);
  }
  certificates(isAdmin?: boolean) {
    const formData: FormData = new FormData();
    formData?.append('token', this.authService.getToken(isAdmin));
    return this.http.post(environment.apiUrl + 'certificates', formData);
  }
}
