import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAutenticado(isAdmin?: boolean) {
    if (localStorage.getItem(isAdmin ? 'admin' : 'user')) return true;
    return false;
  }

  getUser(isAdmin?: boolean) {
    var data = JSON.parse(
      localStorage.getItem(isAdmin ? 'admin' : 'user') || '{}'
    );
    return {
      name: data.name,
      email: data.email,
    };
  }

  getToken(isAdmin?: boolean) {
    var data = JSON.parse(
      localStorage.getItem(isAdmin ? 'admin' : 'user') || '{}'
    );
    return data?.token;
  }
  setUser(newToken: any) {
    var data = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : newToken;
    data.token = newToken.token;
    localStorage.setItem('user', JSON.stringify(data));
  }
  setAdmin(newToken: any) {
    var data = localStorage.getItem('admin')
      ? JSON.parse(localStorage.getItem('admin') || '{}')
      : newToken;
    data.token = newToken.token;
    localStorage.setItem('admin', JSON.stringify(data));
  }
  getPermisson() {
    var data = JSON.parse(localStorage.getItem('user') || '{}');
    return { isAdmin: data.permission == 'A', isUser: data.permission == 'U' };
  }

  deslogar() {
    localStorage.removeItem('user');
  }
  deslogarAdmin() {
    localStorage.removeItem('admin');
  }
}
