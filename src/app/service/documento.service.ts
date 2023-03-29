import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  documents() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'documents', formData);
  }

  uploadDocument(file: any, type: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post(environment.apiUrl + 'uploadDocument', formData);
  }

  uploadDocumentAdmin(file: any, type: any, user: any, isAdmin?: boolean) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(isAdmin));
    formData.append('file', file);
    formData.append('type', type);
    formData.append('user', user);
    return this.http.post(environment.apiUrl + 'admin/admindocument', formData);
  }

  downloads() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken());
    return this.http.post(environment.apiUrl + 'downloads', formData);
  }
  downloadsAdmin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/downloads', formData);
  }
  downloadsDeleteAdmin(id: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/downloads/del/' + id,
      formData
    );
  }
  downloadsAddAdmin(data: any, file: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('data', JSON.stringify(data));
    formData.append('file', file);
    return this.http.post(environment.apiUrl + 'admin/downloads/add', formData);
  }
  documentsGetAdmin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/admingetdocuments',
      formData
    );
  }
}
