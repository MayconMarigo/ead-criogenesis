import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  users() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/users', formData);
  }
  usersPending() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/users/pending', formData);
  }
  userPendingAction(idUser: string, status: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    // 1 aprovado, 2 recusado
    formData.append('status', status);
    return this.http.post(
      environment.apiUrl + 'admin/users/pending/' + idUser,
      formData
    );
  }

  lastRegisteredUsersAdmin() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/lastRegisteredUsers',
      formData
    );
  }

  usersDocuments() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/users/documents',
      formData
    );
  }
  deleteUser(userId: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(
      environment.apiUrl + 'admin/users/delete/' + userId,
      formData
    );
  }

  userDocumentApprove(document: string, status: string, error: string | null) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    // 1 aprovado, 2 recusado
    formData.append('document', document);
    formData.append('status', status);
    if (error) formData.append('error', error);
    return this.http.post(
      environment.apiUrl + 'admin/users/documents/approve',
      formData
    );
  }

  userApproveById(userId: string) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('status', '2');
    return this.http.post(
      environment.apiUrl + 'admin/users/approve/' + userId,
      formData
    );
  }

  usersAgreed() {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    return this.http.post(environment.apiUrl + 'admin/users/agreed', formData);
  }

  adminUpdateUser(data: any) {
    const formData: FormData = new FormData();
    formData.append('token', this.authService.getToken(true));
    formData.append('data', JSON.stringify(data));
    return this.http.post(environment.apiUrl + 'admin/users/update', formData);
  }
}
