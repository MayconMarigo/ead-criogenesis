import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllCertificates(isAdmin?: boolean) {
    const formData: FormData = new FormData();
    formData?.append('token', this.authService.getToken(isAdmin));
    return this.http.post(environment.apiUrl + 'admin/certificates', formData);
  }

  getCertificateByUser($user: any) {
    const formData: FormData = new FormData();
    formData.append('user', $user);
    return this.http.post(environment.apiUrl + 'certificate', formData);
  }

  getCertificateUrlAdmin($user: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('user', $user);
    return this.http.post(
      environment.apiUrl + 'admin/adminusercertificate',
      formData
    );
  }
}
